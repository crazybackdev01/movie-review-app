import { apiSlice } from "./apiSlice.js";
import { USER_URL } from "../constants.js";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        method: "POST",
        url: `${USER_URL}/logout`,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        method: "PUT",
        body: data,
        url: `${USER_URL}/profile`,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `${USER_URL}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
} = usersApiSlice;
