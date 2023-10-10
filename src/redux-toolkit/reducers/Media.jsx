import { createSlice } from "@reduxjs/toolkit";
import { MEDIA_TYPE_VIDEO } from "@/utils/constant";
import { getItemFromArr } from "@/utils/function";

const initialState = {
  medias: [], // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
  selectedMediaId: "",
  showMedia: false,
  mediaSide: true, //true: left, false: right
  isPlaying: false,
  frameSpeed: "1.0",
  volume: 100,
  currentTime: 0.000001,  // unit is 'second'
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMedias: (state, action) => {
      return { ...state, medias: action.payload };
    },
    setSelectedMediaId: (state, action) => {
      return { ...state, selectedMediaId: action.payload, isPlaying: false, showMedia: getItemFromArr(state.medias, "fileId", action.payload)?.mediaType == MEDIA_TYPE_VIDEO, frameSpeed: "1.0", volume: 100, currentTime: 0.000001};
    },
    setShowMedia: (state, action) => {
      return { ...state, showMedia: action.payload };
    },
    clearSelectedMediaId: (state, action) => {
      return { ...state, selectedMediaId: "", showMedia: false, isPlaying: false, frameSpeed: "1.0", volume: 100, currentTime: 0.000001 };
    },
    toggleMediaSide: (state, action) => {
      return { ...state, mediaSide: !state.mediaSide };
    },
    setIsPlaying: (state, action) => {
      return { ...state, isPlaying: action.payload };
    },
    setFrameSpeed: (state, action) => {
      return { ...state, frameSpeed: action.payload };
    },
    setVolume: (state, action) => {
      return { ...state, volume: action.payload };
    },
    setCurrentTime: (state, action) => {
      return { ...state, currentTime: action.payload };
    },
  },
});

const { reducer, actions } = mediaSlice;

export const { setMedias, setSelectedMediaId, clearSelectedMediaId, setShowMedia, toggleMediaSide, setIsPlaying, setFrameSpeed, setVolume, setCurrentTime } = actions;
export default reducer;
