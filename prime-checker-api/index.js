const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use a different port than the React app

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i = i + 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// Add a root route for a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Prime Checker API! Use the /is-prime/:number endpoint to check if a number is prime.');
});

app.get('/is-prime/:number', (req, res) => {
  const numberParam = req.params.number;
  const number = parseInt(numberParam, 10);

  if (isNaN(number)) {
    return res.status(400).json({ error: 'Invalid input: Not a number.', input: numberParam });
  }

  // Optional: Add a reasonable upper limit to prevent very long computations
  if (number > 1000000000) { // Example limit: 1 billion
    return res.status(400).json({ 
        error: 'Input number too large. Please use a number up to 1,000,000,000.',
        input: numberParam 
    });
  }
  
  // Optional: Handle negative numbers or specific cases as desired
  if (number < 0) {
    return res.status(400).json({ error: 'Invalid input: Please provide a non-negative number.', input: numberParam });
  }

  const result = isPrime(number);
  res.json({ 
    number: number,
    isPrime: result 
  });
});

app.listen(port, () => {
  console.log(`Prime checker API listening at http://localhost:${port}`);
}); 