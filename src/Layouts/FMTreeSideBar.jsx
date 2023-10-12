import { useState } from "react";
import FMTreeView from "../Components/FMTreeView";
import { findPath, treeData } from "./FMMuiTreeSideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setPathToSelectedNode,
  setSelectedNode,
} from "../redux-toolkit/reducers/TreeView";

const FMTreeSideBar = () => {
  const dispatch = useDispatch();
  const { selectedNode } = useSelector((state) => state.treeview);

  const handleSelect = (event, nodeId) => {
    const path = findPath(treeData, nodeId);
    dispatch(setSelectedNode(nodeId));
    dispatch(setPathToSelectedNode(path));
  };

  return (
    <div className="flex w-full flex-col pl-4 relative h-full">
      <div className="flex mt-3">
        <img
          src="/image/FMHomeIcon.svg"
          className="w-[18px] h-[18px]"
          alt="home icon"
        />
        <div className="text-[#212121] text-[13px] font-bold ml-2">Site</div>
      </div>
      <FMTreeView
        treeData={treeData}
        handleSelect={handleSelect}
        selectedNode={selectedNode}
      />
    </div>
  );
};

export default FMTreeSideBar;
