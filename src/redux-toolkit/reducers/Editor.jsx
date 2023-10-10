import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomTranscriptNum: 100,
  speakerMethod: true, // true: Horizontal false: vertical
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setZoomTranscriptNum: (state, action) => {
      return { ...state, zoomTranscriptNum: action.payload };
    },
    toggleSpeaker: (state, action) => {
      return { ...state, speakerMethod: !state.speakerMethod };
    },
  },
});

const { reducer, actions } = editorSlice;

export const { setZoomTranscriptNum, toggleSpeaker } = actions;
export default reducer;