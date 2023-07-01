const request = require('supertest');
const app = require('../app.js');

const port = 7900; 
let server;

// beforeAll((done) => {
//     server = app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//         done();
//     });
// });

// afterAll((done) => {
//     server.close(done);
// });
// jest.setTimeout(10000);

describe('API Endpoints', () => {
    test('GET /api/receipts/:id - should return 200 and the receipt with calculated points', async () => {
        const id = 'b36ece29-6055-4265-bcf8-47b5f87f0be3';

        const response = await request(app).get(`/api/receipts/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('receipt');
        expect(response.body.receipt).toHaveProperty('points');
    }, 10000);

    test('GET /api/receipts/:id - should return 404 when receipt id does not exist', async () => {
        const id = 'nonexistent-id';

        const response = await request(app).get(`/api/receipts/${id}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('POST /api/receipts - should return 201 and the created receipt with calculated points', async () => {
        const receiptData = {
            retailer: 'Target',
            purchaseDate: '2022-01-01',
            purchaseTime: '13:01',
            items: [
                {
                    shortDescription: 'Mountain Dew 12PK',
                    price: '6.49',
                },
            ],
            total: '6.49',
        };

        const response = await request(app).post('/api/receipts').send(receiptData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('receipt');
        expect(response.body.receipt).toHaveProperty('points');
    });

    test('POST /api/receipts - should return 400 when request payload is invalid', async () => {
        const invalidData = {
            retailer: 'Invalid Retailer',
            purchaseDate: '2022-01-01',
            purchaseTime: '13:01',
            // Missing items and total properties
        };

        const response = await request(app).post('/api/receipts').send(invalidData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('GET /api/receipts/:id - should return the correct points value in the response', async () => {
        const id = 'b36ece29-6055-4265-bcf8-47b5f87f0be3';
        const expectedPoints = 100; // Modify this based on the expected points for the receipt

        const response = await request(app).get(`/api/receipts/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('receipt');
        expect(response.body.receipt).toHaveProperty('points', expectedPoints);
    });

    test('POST /api/receipts - should calculate the correct points value in the response', async () => {
        const receiptData = {
            retailer: 'M&M Corner Market',
            purchaseDate: '2022-03-20',
            purchaseTime: '14:33',
            items: [
                {
                    shortDescription: 'Gatorade',
                    price: '2.25',
                },
                {
                    shortDescription: 'Gatorade',
                    price: '2.25',
                },
                {
                    shortDescription: 'Gatorade',
                    price: '2.25',
                },
                {
                    shortDescription: 'Gatorade',
                    price: '2.25',
                },
            ],
            total: '9.00',
        };
        const expectedPoints = 28; // Modify this based on the expected points for the receipt

        const response = await request(app).post('/api/receipts').send(receiptData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('receipt');
        expect(response.body.receipt).toHaveProperty('points', expectedPoints);
    });

});
