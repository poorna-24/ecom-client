import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/usersSlice";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
