require('dotenv').config();
const db = require("./db");

const categories = ["Electronics", "Books", "Fashion", "Home", "Sports"];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seed() {
    try {
        console.log('Seeding started....');

        const total = 200000;
        const batchSize = 5000;
        
        for (let i = 0; i < total; i += batchSize) {
            let values = [];

            for (let j = 0; j < batchSize; j++) {
                const name = `Product-${i + j}`;
                const category = categories[(i + j) % categories.length];
                const price = getRandomInt(100, 5000);

                values.push(`('${name}', '${category}', ${price})`);
            }

            const sql = `
                INSERT INTO products (name, category, price)
                VALUES ${values.join(",")}
            `;

            await db.execute(sql);

            console.log(`Inserted: ${i + batchSize}/${total}`);
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    }
    catch (err) {
        console.error("Error sending data: ", err);
        process.exit(1)
    }
}

seed();