const { v4: uuidv4 } = require('uuid');
const { calculatePoints } = require('../utils/pointCalculator');

const receipts = {};

exports.processReceipt = (req, res) => {
    
    const receipt = req.body;
    console.log('Received receipt:', receipt);

    // For processing the receipt

    // Send the response

    const id = uuidv4();

    const points = calculatePoints(receipt);
    receipts[id] = points;
    res.status(200).json({ id });
};

exports.getPoints = (req, res) => {
    const id = req.params.id;
    const points = receipts[id];
    if (points) {
        res.status(200).json({ points });
    } else {
        res.status(404).json({ error: 'No receipt found for that id' });
    }
};

exports.home = (req, res) => {
    res.send('Website is running!');
};
