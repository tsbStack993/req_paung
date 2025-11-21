const express = require('express');
const app = express();
// your existing middleware and routes setup here, move from server.js

// Example:
app.get('/api', (req, res) => {
  res.send('Hello from backend API');
});

module.exports = app;
