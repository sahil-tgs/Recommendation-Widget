const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const widgets = new Map();

// Mock data endpoint
app.get('/api/proxy-products', (req, res) => {
    // Mock product data with placeholder images
    const mockProducts = {
        data: {
            products: [
                {
                    productId: 1,
                    brand: "Van Heusen",
                    productName: "Men White Formal Shirt",
                    price: 2499,
                    searchImage: `/api/placeholder/400/600`,
                    discountDisplayLabel: "20% OFF"
                },
                {
                    productId: 2,
                    brand: "Louis Philippe",
                    productName: "Men Blue Formal Shirt",
                    price: 2799,
                    searchImage: `/api/placeholder/400/600`,
                    discountDisplayLabel: "30% OFF"
                },
                {
                    productId: 3,
                    brand: "Arrow",
                    productName: "Men Black Formal Shirt",
                    price: 1999,
                    searchImage: `/api/placeholder/400/600`,
                    discountDisplayLabel: "40% OFF"
                },
                {
                    productId: 4,
                    brand: "Park Avenue",
                    productName: "Men Grey Formal Shirt",
                    price: 1799,
                    searchImage: `/api/placeholder/400/600`,
                    discountDisplayLabel: "25% OFF"
                },
                {
                    productId: 5,
                    brand: "Peter England",
                    productName: "Men Pink Formal Shirt",
                    price: 1599,
                    searchImage: `/api/placeholder/400/600`,
                    discountDisplayLabel: "35% OFF"
                }
            ]
        }
    };
    
    res.json(mockProducts);
});

app.get('/api/widgets', (req, res) => {
    const widgetList = Array.from(widgets.values());
    res.json(widgetList);
});

app.get('/api/widgets/:id', (req, res) => {
    const widget = widgets.get(req.params.id);
    if (!widget) {
        return res.status(404).json({ error: 'Widget not found' });
    }
    res.json(widget);
});

app.post('/api/widgets', (req, res) => {
    const id = uuidv4();
    const widget = {
        id,
        ...req.body,
        createdAt: new Date().toISOString()
    };
    widgets.set(id, widget);
    console.log('Created widget:', widget);
    res.status(201).json(widget);
});

app.put('/api/widgets/:id', (req, res) => {
    const id = req.params.id;
    if (!widgets.has(id)) {
        return res.status(404).json({ error: 'Widget not found' });
    }
    const widget = {
        ...widgets.get(id),
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    widgets.set(id, widget);
    res.json(widget);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});