import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDragging: true,
  draggingElements: [],
};

const fmdragdropslice = createSlice({
  name: "fmdragdrop",
  initialState,
  reducers: {
    setDraggingStatus: (state, action) => {
      return { ...state, isDragging: action.payload };
    },
    setDraggingElements: (state, action) => {
      return { ...state, draggingElements: action.payload };
    },
  },
});

const { reducer, actions } = fmdragdropslice;

export const { setDraggingStatus, setDraggingElements } = actions;
export default reducer;
