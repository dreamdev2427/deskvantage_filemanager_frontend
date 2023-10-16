import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./reducers/Media";
import SidebarReducer from "./reducers/Sidebar";
import EditorReducer from "./reducers/Editor";
import TreeviewReducer from "./reducers/TreeView";
import FMDragDrop from "./reducers/FMDragDrop";

const reducer = {
  media: mediaReducer,
  sidebar: SidebarReducer,
  editor: EditorReducer,
  treeview: TreeviewReducer,
  fmdragdrop: FMDragDrop,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
