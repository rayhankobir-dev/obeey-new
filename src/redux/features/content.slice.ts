import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      return { podcasts: action.payload };
    },
    setGenres: (state, action) => {
      return { genres: action.payload };
    },
  },
});

const { reducer, actions } = contentSlice;

export const { setPodcasts, setGenres } = actions;
export default reducer;
