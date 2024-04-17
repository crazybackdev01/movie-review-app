import Movie from "../models/Movie.models.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @CREATE_MOVIE
 * @ROUTE @POST {url}/api/v1/movies/create
 * @ACCESS PRIVATE (ADMIN ONLY)
 */
const createMovieController = asyncHandler(async (req, res) => {
  const { name, genre, Year, detail } = req.body;
  if (!name || !genre || !Year || !detail) {
    res.status(404);
    throw new Error("Please provide required fields");
  }
  const newMovie = await new Movie(req.body).save();
  return res.status(200).json(newMovie);
});

/**
 * @GET_ALL_MOVIES
 * @ROUTE @GET {url}/api/v1/movies/all-movies
 * @ACCESS PUBLIC
 */
const getAllMoviesController = asyncHandler(async (req, res) => {
  const allMovies = await Movie.find({});
  return res.status(200), json(allMovies);
});

/**
 * @GET_SPECIFIC_MOVIE
 * @ROUTE @GET {url}/api/v1/movies/specific-movie/:id
 * @ACCESS PUBLIC
 */
const getSpecificMovieController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movieToGet = await Movie.findById(id);
  if (!movieToGet) return res.status(404).json({ error: "Movie not found" });
  return res.status(200).json(movieToGet);
});

/**
 * @UPDATE_MOVIE
 * @ROUTE @PUT {url}/api/v1/movies/update-movie/:id
 * @ACCESS PRIVATE (ADMIN ONLY)
 */
const updateMovieController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedMovie)
    return res.status(404).json({ error: "Movie not found or not updated" });
  return res.status(200).json(updatedMovie);
});
/**
 * @POST_REVIEW
 * @ROUTE @POST {url}/api/v1/movies/:id/reviews
 * @ACCESS PRIVATE (Logged in User ONLY)
 */
const postReviewController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    res.status(404);
    throw new Error("Please provide required fields necessary");
  }
  const movie = await Movie.findById(id);
  if (movie) {
    const alreadyReviewed = movie.reviews.find(
      (r) => r.user.toString() === req.user._id
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Movie already reviewed");
    }

    movie.reviews.push({
      rating: Number(rating), //as rating may be in String type in request body
      comment,
      name: req.user.username,
      user: req.user._id,
    });
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.reduce((acc, r) => acc + r.rating, 0) /
      movie.reviews.length;
    const updatedMovie = await movie.save();
    res.status(200).json(updatedMovie);
  } else {
    res.status(404);
    throw new Error("Movie not found to review");
  }
});
/**
 * @DELETE_MOVIE
 * @ROUTE @DELETE {url}/api/v1/movies/delete-movie/:id
 * @ACCESS PRIVATE (ADMIN ONLY)
 */
const deleteMovieController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (!deletedMovie) {
    res.status(404);
    throw new Error("Movie not deleted");
  }
  return res.status(200).json(deletedMovie);
});
/**
 * @DELETE_COMMENT
 * @ROUTE @DELETE {url}/api/v1/movies/delete-comment/:id
 * @ACCESS PRIVATE (ADMIN ONLY)
 */
const deleteCommentController = asyncHandler(async (req, res) => {
  const { movieId, reviewId } = req.body;
  const movie = Movie.findById(movieId);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  const reviewIndex = movie.reviews.findIndex(
    (r) => r._id.toString() === reviewId
  );
  if (reviewIndex === -1) {
    res.status(404);
    throw new Error("Review not found");
  }
  movie.reviews.splice(reviewIndex, 1);
  movie.numReviews = movie.reviews.length;
  movie.rating =
    movie.reviews.length > 0
      ? movie.reviews.reduce((acc, r) => acc + r, 0) / movie.reviews.length
      : 0;
  return res.status.json({ message: "Review deleted successfully" });
});
/**
 * @GET_NEW_MOVIES
 * @ROUTE @GET {url}/api/v1/movies/new-movies
 * @ACCESS PUBLIC
 */
const getNewMoviesController = asyncHandler(async (req, res) => {
  const movies = await Movie.findById({}).sort({ createdAt: -1 }).limit(10);
  return res.status(200).json(movies);
});
/**
 * @GET_TOP_MOVIES
 * @ROUTE @GET {url}/api/v1/movies/top-movies
 * @ACCESS PUBLIC
 */
const getTopMoviesController = asyncHandler(async (req, res) => {
  const topRatedMovies = await Movie.find({})
    .sort({ numReviews: -1 })
    .limit(10);
  res.status(200).json(topRatedMovies);
});
/**
 * @GET_RANDOM_MOVIES
 * @ROUTE @GET {url}/api/v1/movies/random-movies
 * @ACCESS PUBLIC
 */
const getRandomMoviesController = asyncHandler(async (req, res) => {
  const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
  res.status.json(randomMovies);
});
export {
  createMovieController,
  getAllMoviesController,
  getSpecificMovieController,
  updateMovieController,
  postReviewController,
  deleteMovieController,
  deleteCommentController,
  getNewMoviesController,
  getTopMoviesController,
  getRandomMoviesController,
};
