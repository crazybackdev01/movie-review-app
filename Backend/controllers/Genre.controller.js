import Genre from "../models/Genre.models.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @CREATE_GENRE
 * @ROUTE @POST {{URL}}/api/v1/genre/
 * @ACCESS Private (Authorizated Admin)
 */
const createGenreController = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).json({ error: "Name is required" });
    }
    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return res.status(404).json({ error: "Genre already exists" });
    }

    const newGenre = new Genre({ name });
    await newGenre.save();
    return res.status(200).json(newGenre);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error });
  }
});

/**
 * @UPDATE_GENRE
 * @ROUTE @POST {{url}}/api/v1/genre/:id
 * @ACCESS Private (Authorized Admin)
 */
const updateGenreController = asyncHandler(async (req, res) => {
  try {
    const { name: newName } = req.body;
    const { id } = req.params;

    const isExistGenre = await Genre.findOne({ _id: id });
    if (!isExistGenre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    isExistGenre.name = newName;
    const updatedGenre = await isExistGenre.save();
    //updatedGenre will contain the new Genre object that is updated including id and name(all details)
    return res.status(200).json(updatedGenre);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
});

/**
 * @DELETE_GENRE
 * @ROUTE @DELETE {{url}}/api/v1/genre/:id
 * @ACCESS Private (Authorized Admin)
 */
const deleteGenreController = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const genreToDelete = await Genre.findByIdAndDelete(id);
    if (!genreToDelete) {
      return res.status(404).json({ message: "genre not found" });
    }
    console.log(genreToDelete);
    res.status(200).json(genreToDelete);
  } catch (error) {
    return res.status(404).json(error);
  }
});

/**
 * @GET_ALL_GENRE
 * @ROUTE @GET {{url}}/api/v1/genre/genres
 * @ACCESS Public
 */
const getAllGenreController = asyncHandler(async (req, res) => {
  try {
    const allGenres = await Genre.find({});
    return res.status(200).json(allGenres);
  } catch (error) {
    return res.status(404).json({ error: "Cannot Get all genres" });
  }
});
/**
 * @GET_SPECIFIC_GENRE
 * @ROUTE @GET {{url}}/api/v1/genre/:id
 * @ACCESS Public
 */
const readGenreController = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const genreToRead = await Genre.findOne({ _id: id });
    return res.status(200).json(genreToRead);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Cannot Read Genre" });
  }
});
export {
  createGenreController,
  updateGenreController,
  deleteGenreController,
  getAllGenreController,
  readGenreController,
};
