const express = require('express')
require("dotenv").config();
const cors = require('cors')
const axios = require('axios');
const app = express()
const PORT = process.env.PORT || 4005
const sequelize = require('./util/database');
const { isAuthenticated } = require('./middleware/isAuthenticated');

const auth = require('./controllers/auth');
const favorites = require('./controllers/favorites');
require('./models/initModels.js');

app.use(cors());
app.use(express.json());

// favorite crud routes
app.get('/api/favorites/', isAuthenticated, favorites.getAllFavorites);
app.post('/api/favorites/:id', isAuthenticated, favorites.addFavorite);
app.delete('/api/favorites/:id', isAuthenticated, favorites.deleteFavorite);

// User auth
app.post('/api/register', auth.register);
app.post('/api/login', auth.login);

app.get('/yelp-api', async (req, res) => {
  try {
    let qParams = '?location=' + req.query.location
    const response = await axios.get('https://api.yelp.com/v3/businesses/search' + qParams, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.Yelp_Token,
      },
      // params: req.query, // Forward query parameters from the client
    });
    res.json(response.data);
    // console.log(res.json(response.data))
  } catch (error) {
    console.error('Error in Yelp API request:', error.message);
    res.status(500).json({ error: 'Oops' });
  }
});

sequelize.sync()
.then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})
.catch(err => console.log(err));
