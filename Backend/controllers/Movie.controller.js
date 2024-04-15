import express from "express";
import Movie from "../models/Movie.models.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @CREATE_MOVIE
 * @ROUTE @POST {url}/api/v1/movies/create
 * @ACCESS PRIVATE (ADMIN ONLY)
 */
const createMovieController = asyncHandler(async (req, res) => {
  const newMovie = await new Movie(req.body).save();
  return res.status(200).json({ newMovie });
});

/**
 * @GET_ALL_MOVIES
 * @ROUTE @GET {url}/api/v1/movies/all-movies
 * @ACCESS PUBLIC
 */
const getAllMoviesController = asyncHandler(async (req, res) => {
  const allMovies = await Movie.find({});
  return res.status(200), json({ allMovies });
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
  return res.status(200).json({ movieToGet: movieToGet });
});

/**
 * @UPDATE_MOVIE
 * @ROUTE @PUT {url}/api/v1/movies/specific-movie/:id
 * @ACCESS PRIVATE (ADMIN ONLY)
 */

export {
  createMovieController,
  getAllMoviesController,
  getSpecificMovieController,
};
