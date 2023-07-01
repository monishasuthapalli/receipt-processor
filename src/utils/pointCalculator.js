
exports.calculatePoints = (receipt) => {
    let points = 0;

    // Calculate points based on the rules
    points += calculateAlphanumericCharacters(receipt.retailer);
    points += calculateRoundDollarAmount(receipt.total);
    points += calculateMultipleOfQuarter(receipt.total);
    points += calculateItemPairs(receipt.items);
    points += calculateItemDescriptions(receipt.items);
    points += calculateOddDayPoints(receipt.purchaseDate);
    points += calculateTimePoints(receipt.purchaseTime);

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
    return hours >= 14 && hours < 16;
}
