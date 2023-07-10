
# Receipt Processor

This is a Receipt Processor application that processes receipts and calculates reward points based on certain criteria.

## Prerequisites

To run this application, you need to have the following software installed:

- Node.js 
- Docker 

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory: `cd receipt-processor`.
3. Install the dependencies by running: `npm install`.

## Configuration

Before running the application, you may need to configure some settings. 

- Open the `config.js` file in the root directory.
- Modify the desired configuration options according to your needs.

## Usage

To start the application, run the following command:

```
npm start
```

The application will start running on `http://localhost:7900/receipts`.

## API Endpoints

The following endpoints are available:

- `POST /receipts/process` - Process a receipt and calculate the reward points.
- `GET /receipts/:id/points` - Retrieve the reward points for a specific receipt.

For detailed information about the API endpoints and request/response formats, please refer to the API documentation.

## Docker Support

This application also provides Docker support. If you have Docker installed, you can build and run the application inside a Docker container.

1. Build the Docker image by running the following command:

   ```
   docker build -t receipt-processor .
   ```

2. Run the Docker container using the following command:

   ```
   docker run -p 7900:7900 receipt-processor
   ```

   The application will be accessible at `http://localhost:7900` inside the Docker container.


## Contact

If you have any questions or need further assistance, please feel free to contact us at monishasuthapalli688@gmail.com.
