const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

// const api_key = 'b7c225ded39fc779634428b698bee3e0';
// const baseURL = `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

// since we comment out the api_key:
const generateScraperURL = (api_key) => `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;


// since we want users to define their own api key now we will pass function everywhere..

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to first built api!');
});

// Get Product details:
app.get('/products/:productId', async(req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScraperURL(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get Product reviews:
app.get('/products/:productId/reviews', async(req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScraperURL(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get Product offers:
app.get('/products/:productId/offers', async(req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScraperURL(api_key)}&url=https://www.amazon.com/dp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get search results:
app.get('/search/:searchQuery', async(req, res) => {
    const {searchQuery} = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScraperURL(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`)); 