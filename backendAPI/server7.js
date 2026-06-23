// import express from 'express';
// import cors from 'cors';
// import userRoute from './routes/userRoute.js';
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/auth/client/',userRoute);
// app.listen(5000,()=>{
//     console.log('listening at the port',5000);
// })

// server.js (Updated for MongoDB Atlas cluster from your screenshot)

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 2. Your Atlas connection string
// Change this line in your server.js:
// const ATLAS_URI = "";
// This line will now work perfectly because 'mongoose' is defined above!
mongoose.connect(ATLAS_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  plot: String,
  fullplot: String,
  year: Number,
  runtime: Number,
  rated: String,
  genres: [String],
  cast: [String],
  languages: [String],
  countries: [String],
  directors: [String],
  writers: [String],
  poster: String,
  num_mflix_comments: Number,
  type: String,
  awards: Object,
  imdb: Object,
  tomatoes: Object
}, { 
  // 2. CRITICAL: Explicitly map to 'embedded_movies' as seen in Compass
  collection: 'embedded_movies' 
}); 

const Movie = mongoose.model('Movie', movieSchema);

// GET endpoint to fetch a single movie by ID
// Update your GET endpoint to this:
// Replace your old app.get('/api/movies/:id') with this:
app.get('/api/movies', async (req, res) => {
  try {
    // Get page and limit from query params (defaults to page 1, 25 movies)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    // Fetch movies, skip previous pages, limit the output, and sort by year
    const movies = await Movie.find({})
      .sort({ year: -1 }) // Newest movies first
      .skip(skip)
      .limit(limit);

    // Get total count for pagination controls on frontend
    const totalMovies = await Movie.countDocuments({});

    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(totalMovies / limit),
      totalMovies
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));