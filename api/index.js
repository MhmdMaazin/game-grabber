const express = require('express');

const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Games endpoint
app.get('/api/games', (req, res) => {
  res.json({ 
    games: [
      { id: 1, title: 'Game 1', platform: 'Steam', price: 0 },
      { id: 2, title: 'Game 2', platform: 'Epic', price: 0 }
    ],
    message: 'Games endpoint'
  });
});

// Giveaways endpoint
app.get('/api/giveaways', (req, res) => {
  res.json({ 
    giveaways: [],
    message: 'Giveaways endpoint'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(status).json({ message });
});

module.exports = app;