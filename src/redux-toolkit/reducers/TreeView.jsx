import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNode: "root",
  pathToSelectedNode: [],
  siblingsOfSelectedNode: [],
};

const treeviewSlice = createSlice({
  name: "treeview",
  initialState,
  reducers: {
    setSelectedNode: (state, action) => {
      return { ...state, selectedNode: action.payload };
    },
    setPathToSelectedNode: (state, action) => {
      return { ...state, pathToSelectedNode: action.payload };
    },
    setSiblingsOfSelectedNode: (state, action) => {
      return { ...state, siblingsOfSelectedNode: action.payload };
    },
  },
});

const { reducer, actions } = treeviewSlice;

export const {
  setSelectedNode,
  setPathToSelectedNode,
  setSiblingsOfSelectedNode,
} = actions;
export default reducer;
