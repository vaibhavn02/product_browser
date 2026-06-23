const db = require('../db');

const getProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit || 20);
        const cursor = req.query.cursor;
        const category = req.query.category;

        let query = `SELECT * FROM products`;
        let values = [];

        let conditions = [];

        if (category) {
            conditions.push('category = ?');
            values.push(category);
        }

        if (cursor) {
            conditions.push('created_at < ?');
            values.push(cursor);
            //conditions.push('(created_at < ? OR (created_at = ? AND id < ?))');
            //values.push(cursor, cursor, lastId);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        //query += " ORDER BY created_at DESC LIMIT ?";
        query += ` ORDER BY created_at DESC LIMIT ${limit}`;
        values.push(limit);

        const [rows] = await db.execute(query, values);

        const nextCursor = rows.length 
            ? rows[rows.length - 1].created_at 
            : null;
        
        res.json({
            data: rows,
            nextCursor
        });    
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getProducts };