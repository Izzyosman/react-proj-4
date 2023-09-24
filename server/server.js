const express = require('express')
const cors = require('cors')
const axios = require('axios');
const app = express()
const PORT = process.env.PORT || 4005
// const {sequelize} = require('./util/database')
// const {User} = require('./models/user')
// const {Post} = require('./models/post')

// const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
// const {register, login} = require('./controllers/auth')
// const {isAuthenticated} = require('./middleware/isAuthenticated')

// app.use(express.json())
// app.use(cors())

// User.hasMany(Post)
// Post.belongsTo(User)

// app.post('/register', register)
// app.post('/login', login)

// app.get('/posts', getAllPosts)

// app.get('/userposts/:userId', getCurrentUserPosts)
// app.post('/posts', isAuthenticated, addPost)
// app.put('/posts/:id', isAuthenticated, editPost)
// app.delete('/posts/:id', isAuthenticated, deletePost)

app.use(cors()); // Enable CORS for all routes


app.get('/yelp-api', async (req, res) => {
  try {
    let qParams = '?location=' + req.query.location
    const response = await axios.get('https://api.yelp.com/v3/businesses/search'+qParams, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer jnZqza1cS0hT1T-O3mhZfv9Gh0UpIxxL-gxf22MvZAcvxtj2Q5qPjZFh-ig7SFEhMS-ifZ1cpzecYyQcauVjVfWaNAJp48Zzrnf6OpjYWVdsCuGlBEaurkXCYAMOZXYx',
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

app.listen(PORT, () => {
  console.log(`Proxy server is listening on port ${PORT}`);
});

// sequelize.sync()
// .then(() => {
//     app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
// })
// .catch(err => console.log(err))