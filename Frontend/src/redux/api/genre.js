import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${GENRE_URL}`,
        body: data,
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        body: data,
        url: `${GENRE_URL}/${id}`,
      }),
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${GENRE_URL}/${id}`,
      }),
    }),
    getGenre: builder.query({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
      }),
    }),
    getAllGenre: builder.query({
      query: () => `${GENRE_URL}/genres`,
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useGetAllGenreQuery,
  useUpdateGenreMutation,
  useGetGenreQuery,
} = genreApiSlice;
