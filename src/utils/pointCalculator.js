
exports.calculatePoints = (receipt) => {
    let points = 0;

    // Calculate points based on the rules

    const retailerPoints = calculateAlphanumericCharacters(receipt.retailer);
    console.log('Retailer Points:', retailerPoints);
    points += retailerPoints;

    const roundDollarPoints = calculateRoundDollarAmount(receipt.total);
    console.log('Round Dollar Points:', roundDollarPoints);
    points += roundDollarPoints;

    const multipleOfQuarterPoints = calculateMultipleOfQuarter(receipt.total);
    console.log('Multiple of Quarter Points:', multipleOfQuarterPoints);
    points += multipleOfQuarterPoints;

    const itemPairsPoints = calculateItemPairs(receipt.items);
    console.log('Item Pairs Points:', itemPairsPoints);
    points += itemPairsPoints;

    const itemDescriptionsPoints = calculateItemDescriptions(receipt.items);
    console.log('Item Descriptions Points:', itemDescriptionsPoints);
    points += itemDescriptionsPoints;

    const oddDayPoints = calculateOddDayPoints(receipt.purchaseDate);
    console.log('Odd Day Points:', oddDayPoints);
    points += oddDayPoints;

    const timePoints = calculateTimePoints(receipt.purchaseTime);
    console.log('Time Points:', timePoints);
    points += timePoints;

    console.log('Total Points:', points);



    return points;
};

function calculateAlphanumericCharacters(retailer) {
    const alphanumericRegex = /[A-Za-z0-9]/g;
    const matches = retailer.match(alphanumericRegex);
    return matches ? matches.length : 0;
}

function calculateRoundDollarAmount(total) {
    const totalWithoutCents = parseFloat(total);
    return totalWithoutCents % 1 === 0 ? 50 : 0;
}

function calculateMultipleOfQuarter(total) {
    const totalAmount = parseFloat(total);
    return totalAmount % 0.25 === 0 ? 25 : 0;
}

function calculateItemPairs(items) {
    const itemCount = items.length;
    return Math.floor(itemCount / 2) * 5;
}

function calculateItemDescriptions(items) {
    let points = 0;
    items.forEach((item) => {
        const trimmedLength = item.shortDescription.trim().length;
        if (trimmedLength % 3 === 0) {
            const price = parseFloat(item.price);
            const itemPoints = Math.ceil(price * 0.2);
            points += itemPoints;
        }
    });
    return points;
}

function calculateOddDayPoints(purchaseDate) {
    const day = new Date(purchaseDate).getUTCDate();
    return day % 2 !== 0 ? 6 : 0;
}

function calculateTimePoints(purchaseTime) {
    const [hours, minutes] = purchaseTime.split(':').map(Number);
    return hours >= 14 && hours < 16 ? 10 : 0;
}
