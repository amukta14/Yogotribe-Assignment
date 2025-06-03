# Prime Checker API

This is a simple Node.js Express API that takes a number as input and returns whether it's a prime number or not.

## Setup

1.  **Navigate to the API directory:**
    ```bash
    cd prime-checker-api
    ```

2.  **Install dependencies (if you haven't already from the setup steps):
    ```bash
    npm install
    ```

## Running the API

1.  **Start the server:**
    ```bash
    node index.js
    ```
    The API will start listening on `http://localhost:3001` (or the port specified by the `PORT` environment variable).

## Testing the Endpoint

You can test the `/is-prime/:number` endpoint using a web browser, `curl`, or a tool like Postman.

**Endpoint:** `GET /is-prime/:number`

Replace `:number` with the actual number you want to check.

**Examples using `curl`:**

*   **Check if 7 is prime:**
    ```bash
    curl http://localhost:3001/is-prime/7
    ```
    Expected Response:
    ```json
    {"number":7,"isPrime":true}
    ```

*   **Check if 10 is prime:**
    ```bash
    curl http://localhost:3001/is-prime/10
    ```
    Expected Response:
    ```json
    {"number":10,"isPrime":false}
    ```

*   **Invalid input (not a number):**
    ```bash
    curl http://localhost:3001/is-prime/abc
    ```
    Expected Response:
    ```json
    {"error":"Invalid input: Not a number.","input":"abc"}
    ```

*   **Negative number:**
    ```bash
    curl http://localhost:3001/is-prime/-5
    ```
    Expected Response:
    ```json
    {"error":"Invalid input: Please provide a non-negative number.","input":"-5"}
    ```

*   **Number too large (if you test with a number greater than 1,000,000,000 as per current example limit):
    ```bash
    curl http://localhost:3001/is-prime/2000000000
    ```
    Expected Response:
    ```json
    {"error":"Input number too large. Please use a number up to 1,000,000,000.","input":"2000000000"}
    ``` 