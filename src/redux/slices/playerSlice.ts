import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  isBackgrounPlay: false,
  currentPlayingPodcast: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsBackgrounPlay: (state, action) => {
      state.isBackgrounPlay = action.payload;
    },
    setCurrentPlayPodcast: (state, action) => {
      state.currentPlayingPodcast = action.payload;
    },
  },
});

export const { setIsPlaying, setIsBackgrounPlay, setCurrentPlayPodcast } =
  playerSlice.actions;

export default playerSlice.reducer;
