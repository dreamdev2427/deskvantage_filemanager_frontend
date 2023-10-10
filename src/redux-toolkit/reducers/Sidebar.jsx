import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minWidth: 0,
  maxWidth: 500,
  defaultWidth: 350,
  leftSidebarWidth: 350, // store current width
  rightSidebarWidth: 350,
  prevLeftSidebarWidth: 350, // store prev width before set 0
  prevRightSidebarWidth: 350,

  // show sidebar as per order(+: left sidebar order, -: right sidebar order 1/-1: hidden)
  playlistOrder: 1,
  noteOrder: 1,
  searchOrder: 1,
};

const getMaxOrder = (playlistOrder, noteOrder, searchOrder) => {
  return playlistOrder > noteOrder
    ? playlistOrder > searchOrder
      ? playlistOrder
      : searchOrder
    : noteOrder > searchOrder
    ? noteOrder
    : searchOrder;
};

const getMinOrder = (playlistOrder, noteOrder, searchOrder) => {
  return playlistOrder < noteOrder
    ? playlistOrder < searchOrder
      ? playlistOrder
      : searchOrder
    : noteOrder < searchOrder
    ? noteOrder
    : searchOrder;
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setLeftSidebarWidth: (state, action) => {
      return { ...state, leftSidebarWidth: action.payload };
    },
    setRightSidebarWidth: (state, action) => {
      return { ...state, rightSidebarWidth: action.payload };
    },
    togglePlaylist: (state, action) => {
      let newOrder = 1;
      let newLeftSidebarWidth = state.leftSidebarWidth;
      let newRightSidebarWidth = state.rightSidebarWidth;
      let newPrevLeftSidebarWidth = state.prevLeftSidebarWidth;
      let newPrevRightSidebarWidth = state.prevRightSidebarWidth;
      // change order
      let oldOrder = state.playlistOrder;
      let minOrder = getMinOrder(oldOrder, state.noteOrder, state.searchOrder);
      let maxOrder = getMaxOrder(oldOrder, state.noteOrder, state.searchOrder);
      if (oldOrder < -1)
        oldOrder > minOrder ? (newOrder = minOrder - 1) : (newOrder = -1);
      else if (oldOrder > 1)
        oldOrder < maxOrder ? (newOrder = maxOrder + 1) : (newOrder = 1);
      else if (oldOrder == -1) newOrder = minOrder - 1;
      else if (oldOrder == 1) newOrder = maxOrder + 1;
      // set width
      if (state.noteOrder < 2 && state.searchOrder < 2)
        if (newOrder == 1) {
          newPrevLeftSidebarWidth = newLeftSidebarWidth;
          newLeftSidebarWidth = 0;
        } else if (newOrder == 2) newLeftSidebarWidth = newPrevLeftSidebarWidth;
      if (state.noteOrder > -2 && state.searchOrder > -2)
        if (newOrder == -1) {
          newPrevRightSidebarWidth = newRightSidebarWidth;
          newRightSidebarWidth = 0;
        } else if (newOrder == -2)
          newRightSidebarWidth = newPrevRightSidebarWidth;

      return {
        ...state,
        playlistOrder: newOrder,
        leftSidebarWidth: newLeftSidebarWidth,
        rightSidebarWidth: newRightSidebarWidth,
        prevLeftSidebarWidth: newPrevLeftSidebarWidth,
        prevRightSidebarWidth: newPrevRightSidebarWidth,
      };
    },
    toggleNote: (state, action) => {
      let newOrder = 1;
      let newLeftSidebarWidth = state.leftSidebarWidth;
      let newRightSidebarWidth = state.rightSidebarWidth;
      let newPrevLeftSidebarWidth = state.prevLeftSidebarWidth;
      let newPrevRightSidebarWidth = state.prevRightSidebarWidth;
      // change order
      let oldOrder = state.noteOrder;
      let minOrder = getMinOrder(
        state.playlistOrder,
        oldOrder,
        state.searchOrder
      );
      let maxOrder = getMaxOrder(
        state.playlistOrder,
        oldOrder,
        state.searchOrder
      );
      if (oldOrder < -1)
        oldOrder > minOrder ? (newOrder = minOrder - 1) : (newOrder = -1);
      else if (oldOrder > 1)
        oldOrder < maxOrder ? (newOrder = maxOrder + 1) : (newOrder = 1);
      else if (oldOrder == -1) newOrder = minOrder - 1;
      else if (oldOrder == 1) newOrder = maxOrder + 1;
      // set width
      if (state.playlistOrder < 2 && state.searchOrder < 2)
        if (newOrder == 1) {
          newPrevLeftSidebarWidth = newLeftSidebarWidth;
          newLeftSidebarWidth = 0;
        } else if (newOrder == 2) newLeftSidebarWidth = newPrevLeftSidebarWidth;
      if (state.playlistOrder > -2 && state.searchOrder > -2)
        if (newOrder == -1) {
          newPrevRightSidebarWidth = newRightSidebarWidth;
          newRightSidebarWidth = 0;
        } else if (newOrder == -2)
          newRightSidebarWidth = newPrevRightSidebarWidth;

      return {
        ...state,
        noteOrder: newOrder,
        leftSidebarWidth: newLeftSidebarWidth,
        rightSidebarWidth: newRightSidebarWidth,
        prevLeftSidebarWidth: newPrevLeftSidebarWidth,
        prevRightSidebarWidth: newPrevRightSidebarWidth,
      };
    },
    toggleSearch: (state, action) => {
      let newOrder = 1;
      let newLeftSidebarWidth = state.leftSidebarWidth;
      let newRightSidebarWidth = state.rightSidebarWidth;
      let newPrevLeftSidebarWidth = state.prevLeftSidebarWidth;
      let newPrevRightSidebarWidth = state.prevRightSidebarWidth;
      // change order
      let oldOrder = state.searchOrder;
      let minOrder = getMinOrder(
        state.playlistOrder,
        state.noteOrder,
        oldOrder
      );
      let maxOrder = getMaxOrder(
        state.playlistOrder,
        state.noteOrder,
        oldOrder
      );
      if (oldOrder < -1)
        oldOrder > minOrder ? (newOrder = minOrder - 1) : (newOrder = -1);
      else if (oldOrder > 1)
        oldOrder < maxOrder ? (newOrder = maxOrder + 1) : (newOrder = 1);
      else if (oldOrder == -1) newOrder = minOrder - 1;
      else if (oldOrder == 1) newOrder = maxOrder + 1;
      // set width
      if (state.playlistOrder < 2 && state.noteOrder < 2)
        if (newOrder == 1) {
          newPrevLeftSidebarWidth = newLeftSidebarWidth;
          newLeftSidebarWidth = 0;
        } else if (newOrder == 2) newLeftSidebarWidth = newPrevLeftSidebarWidth;
      if (state.playlistOrder > -2 && state.noteOrder > -2)
        if (newOrder == -1) {
          newPrevRightSidebarWidth = newRightSidebarWidth;
          newRightSidebarWidth = 0;
        } else if (newOrder == -2)
          newRightSidebarWidth = newPrevRightSidebarWidth;

      return {
        ...state,
        searchOrder: newOrder,
        leftSidebarWidth: newLeftSidebarWidth,
        rightSidebarWidth: newRightSidebarWidth,
        prevLeftSidebarWidth: newPrevLeftSidebarWidth,
        prevRightSidebarWidth: newPrevRightSidebarWidth,
      };
    },
    setPlaylistSidebarPosition: (state, action) => {
      let newOrder = 1;
      let oldOrder = state.playlistOrder;
      let newLeftSidebarWidth = state.leftSidebarWidth;
      let newRightSidebarWidth = state.rightSidebarWidth;
      let newPrevLeftSidebarWidth = state.prevLeftSidebarWidth;
      let newPrevRightSidebarWidth = state.prevRightSidebarWidth;
      if (Math.abs(oldOrder) == 1) newOrder = oldOrder * -1;
      else if (oldOrder < -1) {
        newOrder =
          getMaxOrder(oldOrder * -1, state.noteOrder, state.searchOrder) + 1;
        if (state.noteOrder < 2 && state.searchOrder < 2)
          newLeftSidebarWidth = newPrevLeftSidebarWidth;
        if (state.noteOrder > -2 && state.searchOrder > -2) {
          newPrevRightSidebarWidth = newRightSidebarWidth;
          newRightSidebarWidth = 0;
        }
      } else if (oldOrder > 1) {
        newOrder =
          getMinOrder(oldOrder * -1, state.noteOrder, state.searchOrder) - 1;
        if (state.noteOrder > -2 && state.searchOrder > -2)
          newRightSidebarWidth = newPrevRightSidebarWidth;
        if (state.noteOrder < 2 && state.searchOrder < 2) {
          newPrevLeftSidebarWidth = newLeftSidebarWidth;
          newLeftSidebarWidth = 0;
        }
      }
      return {
        ...state,
        playlistOrder: newOrder,
        leftSidebarWidth: newLeftSidebarWidth,
        rightSidebarWidth: newRightSidebarWidth,
        prevLeftSidebarWidth: newPrevLeftSidebarWidth,
        prevRightSidebarWidth: newPrevRightSidebarWidth,
      };
    },
    setNoteSidebarPosition: (state, action) => {
      let newOrder = 1;
      let oldOrder = state.noteOrder;
      let newLeftSidebarWidth = state.leftSidebarWidth;
      let newRightSidebarWidth = state.rightSidebarWidth;
      let newPrevLeftSidebarWidth = state.prevLeftSidebarWidth;
      let newPrevRightSidebarWidth = state.prevRightSidebarWidth;
      if (Math.abs(oldOrder) == 1) newOrder = oldOrder * -1;
      else if (oldOrder < -1) {
        newOrder =
          getMaxOrder(state.playlistOrder, oldOrder * -1, state.searchOrder) +
          1;
        if (state.playlistOrder < 2 && state.searchOrder < 2)
          newLeftSidebarWidth = newPrevLeftSidebarWidth;
        if (state.playlistOrder > -2 && state.searchOrder > -2) {
          newPrevRightSidebarWidth = newRightSidebarWidth;
          newRightSidebarWidth = 0;
        }
      } else if (oldOrder > 1) {
        newOrder =
          getMinOrder(state.playlistOrder, oldOrder * -1, state.searchOrder) -
          1;
        if (state.playlistOrder > -2 && state.searchOrder > -2)
          newRightSidebarWidth = newPrevRightSidebarWidth;
        if (state.playlistOrder < 2 && state.searchOrder < 2) {
          newPrevLeftSidebarWidth = newLeftSidebarWidth;
          newLeftSidebarWidth = 0;
        }
      }
      return {
        ...state,
        noteOrder: newOrder,
        leftSidebarWidth: newLeftSidebarWidth,
        rightSidebarWidth: newRightSidebarWidth,
        prevLeftSidebarWidth: newPrevLeftSidebarWidth,
        prevRightSidebarWidth: newPrevRightSidebarWidth,
      };
    },
    setSearchSidebarPosition: (state, action) => {
      let newOrder = 1;
      let oldOrder = state.searchOrder;
      let newLeftSidebarWidth = state.leftSidebarWidth;
      let newRightSidebarWidth = state.rightSidebarWidth;
      let newPrevLeftSidebarWidth = state.prevLeftSidebarWidth;
      let newPrevRightSidebarWidth = state.prevRightSidebarWidth;
      if (Math.abs(oldOrder) == 1) newOrder = oldOrder * -1;
      else if (oldOrder < -1) {
        newOrder =
          getMaxOrder(state.playlistOrder, state.noteOrder, oldOrder * -1) + 1;
        if (state.playlistOrder < 2 && state.noteOrder < 2)
          newLeftSidebarWidth = newPrevLeftSidebarWidth;
        if (state.playlistOrder > -2 && state.noteOrder > -2) {
          newPrevRightSidebarWidth = newRightSidebarWidth;
          newRightSidebarWidth = 0;
        }
      } else if (oldOrder > 1) {
        newOrder =
          getMinOrder(state.playlistOrder, state.noteOrder, oldOrder * -1) - 1;
        if (state.playlistOrder > -2 && state.noteOrder > -2)
          newRightSidebarWidth = newPrevRightSidebarWidth;
        if (state.playlistOrder < 2 && state.noteOrder < 2) {
          newPrevLeftSidebarWidth = newLeftSidebarWidth;
          newLeftSidebarWidth = 0;
        }
      }
      return {
        ...state,
        searchOrder: newOrder,
        leftSidebarWidth: newLeftSidebarWidth,
        rightSidebarWidth: newRightSidebarWidth,
        prevLeftSidebarWidth: newPrevLeftSidebarWidth,
        prevRightSidebarWidth: newPrevRightSidebarWidth,
      };
    },
  },
});

const { reducer, actions } = sidebarSlice;

export const {
  togglePlaylist,
  toggleNote,
  toggleSearch,
  setPlaylistSidebarPosition,
  setNoteSidebarPosition,
  setSearchSidebarPosition,
  setLeftSidebarWidth,
  setRightSidebarWidth,
} = actions;
export default reducer;
