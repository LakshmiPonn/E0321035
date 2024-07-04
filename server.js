const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;

const WINDOW_SIZE = 10;
let numbers = [];
let windowPrevState = [];
let windowCurrState = [];

const isQualifiedID = (id) => ['p', 'f', 'e', 'r'].includes(id);

const fetchNumbers = async (id) => {
  const url = `http://localhost:9876/numbers/${id}`; // Mock API URL
  try {
    const response = await axios.get(url);
    return response.data.numbers;
  } catch (error) {
    console.error('Error fetching numbers:', error);
    return [];
  }
};

const calculateAverage = (nums) => {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
};

app.get('/numbers/:id', async (req, res) => {
  const id = req.params.id;

  if (!isQualifiedID(id)) {
    return res.status(400).send({ error: 'Invalid ID' });
  }

  windowPrevState = [...windowCurrState];
  const fetchedNumbers = await fetchNumbers(id);

  // Add unique numbers to the current window state
  fetchedNumbers.forEach((num) => {
    if (!windowCurrState.includes(num)) {
      windowCurrState.push(num);
    }
  });

  // Trim the window to the correct size
  while (windowCurrState.length > WINDOW_SIZE) {
    windowCurrState.shift();
  }

  const avg = calculateAverage(windowCurrState);

  const response = {
    windowPrevState,
    windowCurrState,
    numbers: fetchedNumbers,
    avg,
  };

  res.send(response);
});

app.listen(port + 1, () => {
  console.log(`Main server running at http://localhost:${port + 1}/`);
});
