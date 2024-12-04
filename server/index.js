const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4000;

app.get('/myntra', async (req, res) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'https://www.myntra.com/gateway/v2/product/31602544/related',
            headers: {
                'accept': 'application/json',
                'accept-language': 'en-US,en;q=0.9',
                'origin': 'https://www.myntra.com',
                'referer': 'https://www.myntra.com/formal-shoes/killer/killer-men-round-toe-lace-ups-formal-derby-shoes/31602544/buy',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'x-meta-app': 'channel=web',
                'x-myntraweb': 'Yes',
                'x-requested-with': 'browser',
                'cookie': 'pv=default; at=ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbXRwWkNJNklqRWlMQ0owZVhBaU9pSktWMVFpZlEuZXlKdWFXUjRJam9pTW1ReFlqRXdaRGt0WWpJellTMHhNV1ZtTFdGbE9EUXRPVFkxWVdJM1lqRTROVE5oSWl3aVkybGtlQ0k2SW0xNWJuUnlZUzB3TW1RM1pHVmpOUzA0WVRBd0xUUmpOelF0T1dObU55MDVaRFl5WkdKbFlUVmxOakVpTENKaGNIQk9ZVzFsSWpvaWJYbHVkSEpoSWl3aWMzUnZjbVZKWkNJNklqSXlPVGNpTENKbGVIQWlPakUzTkRnNE5qWTROREFzSW1semN5STZJa2xFUlVFaWZRLkpQSXI4VDNSeFdpdGQ4c0RZQ3lLNEUtaXpoQ3VRMFprS21pQ0pmZThzRFk='
            }
        });
        
        console.log('Success');
        res.json(response.data);
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}/myntra`));