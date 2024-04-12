import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice.js";
import { apiSlice } from "./api/apiSlice.js";
/*
To know more about getDefaultMiddleware() and middleware functions :-
https://redux-toolkit.js.org/api/getDefaultMiddleware#intended-usage
*/
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
