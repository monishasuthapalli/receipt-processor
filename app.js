const express = require('express');
const app = express();
const receiptRoutes = require('./src/routes/receiptRoutes.js');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use('/receipts', receiptRoutes);

const port = 7900;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// module.exports = app;
