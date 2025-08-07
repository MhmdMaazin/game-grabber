const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const GAMERPOWER_BASE_URL = "https://www.gamerpower.com/api";

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/giveaways', async (req, res) => {
  try {
    const { platform, type, sort } = req.query;
    
    let apiUrl = `${GAMERPOWER_BASE_URL}/giveaways`;
    const params = new URLSearchParams();
    
    if (platform && platform !== 'all') {
      params.append('platform', platform);
    }
    
    if (type && type !== 'all') {
      params.append('type', type);
    }
    
    if (sort && sort !== 'popularity') {
      params.append('sort-by', sort);
    }
    
    if (params.toString()) {
      apiUrl += `?${params.toString()}`;
    }
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching giveaways:', error);
    res.status(500).json({ error: 'Failed to fetch giveaways' });
  }
});

app.get('/api/giveaway/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${GAMERPOWER_BASE_URL}/giveaway/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Giveaway not found' });
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching giveaway:', error);
    res.status(500).json({ error: 'Failed to fetch giveaway' });
  }
});

app.get('/api/platforms', (req, res) => {
  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'pc', label: 'PC' },
    { value: 'steam', label: 'Steam' },
    { value: 'epic-games-store', label: 'Epic Games Store' },
    { value: 'gog', label: 'GOG' },
    { value: 'ubisoft', label: 'Ubisoft Connect' },
    { value: 'origin', label: 'Origin' },
    { value: 'xbox-one', label: 'Xbox One' },
    { value: 'xbox-series-xs', label: 'Xbox Series X|S' },
    { value: 'playstation-4', label: 'PlayStation 4' },
    { value: 'playstation-5', label: 'PlayStation 5' },
    { value: 'switch', label: 'Nintendo Switch' },
    { value: 'android', label: 'Android' },
    { value: 'ios', label: 'iOS' }
  ];
  res.json(platforms);
});

app.get('/api/types', (req, res) => {
  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'game', label: 'Game' },
    { value: 'dlc', label: 'DLC' },
    { value: 'loot', label: 'Loot' },
    { value: 'beta', label: 'Beta' }
  ];
  res.json(types);
});

app.get('/api/sort-options', (req, res) => {
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'date', label: 'Date' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'worth', label: 'Worth' }
  ];
  res.json(sortOptions);
});

app.get('/api/stats', (req, res) => {
  const stats = {
    totalGiveaways: 1250,
    totalPlatforms: 14,
    activeGiveaways: 847,
    totalWorth: 15000
  };
  res.json(stats);
});

module.exports = app;