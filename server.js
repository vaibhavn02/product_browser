require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, 'public')));

const productRoutes = require('./routes/productRoutes');

app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});