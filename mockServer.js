const express = require('express');
const app = express();
const port = 9876;

// Example data for different IDs
const data = {
  p: [2, 3, 5, 7],
  f: [1, 1, 2, 3, 5],
  e: [2, 4, 6, 8, 10],
  r: [15, 23, 42, 58, 67]
};

app.get('/numbers/:id', (req, res) => {
  const id = req.params.id;
  if (data[id]) {
    res.send({ numbers: data[id] });
  } else {
    res.status(400).send({ error: 'Invalid ID' });
  }
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}/`);
});
