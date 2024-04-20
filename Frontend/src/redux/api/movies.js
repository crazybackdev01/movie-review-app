import { MOVIE_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMovie: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${MOVIE_URL}/create`,
        body: data,
      }),
    }),
  }),
});
