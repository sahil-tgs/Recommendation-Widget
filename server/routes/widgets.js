// server/routes/widgets.js
const express = require('express');
const router = express.Router();
const Widget = require('../models/Widget');
const axios = require('axios');

// Widget routes
router.post('/widgets', (req, res) => {
  try {
    console.log("Creating widget with config:", req.body);
    const widget = Widget.create(req.body);
    res.json(widget);
  } catch (error) {
    console.error("Widget creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/widgets/:id', (req, res) => {
  try {
    console.log("Fetching widget:", req.params.id);
    const widget = Widget.find(req.params.id);
    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' });
    }
    res.json(widget);
  } catch (error) {
    console.error("Widget fetch error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Myntra API proxy
router.get('/product/:productId/recommendations', async (req, res) => {
  try {
    const { productId } = req.params;
    const response = await axios.get(
      `https://www.myntra.com/gateway/v2/product/${productId}/related`,
      {
        headers: {
          'x-meta-app': 'channel=web',
          'x-myntraweb': 'Yes'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Recommendations fetch error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;