import { useState, useEffect } from "react";
import FMTreeView from "../Components/FMTreeView";
import { findPath, treeData } from "./FMMuiTreeSideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setPathToSelectedNode,
  setSelectedNode,
} from "../redux-toolkit/reducers/TreeView";

const FMTreeSideBar = (props) => {
  const { selectedNode } = useSelector((state) => state.treeview);
  const dispatch = useDispatch();
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showOrHide, setShowOrHide] = useState(false);

  const handleSelect = (event, nodeId) => {
    const path = findPath(treeData, nodeId);
    dispatch(setSelectedNode(nodeId));
    dispatch(setPathToSelectedNode(path));
  };

  useEffect(() => {
    if (props.showOrHide) setShowOrHide(props.showOrHide);
  }, [props]);

  return (
    <div
      className={`w-full flex-col relative   ${
        showOrHide === true ? "pl-4 flex relative" : "pl-0 hidden"
      }`}
    >
      <div className="z-50 absolute -top-[23px] right-[46px] select-none cursor-pointer">
        <button
          className=" flex items-center justify-center h-[46px] w-[46px] 
      rounded-full shadow-md hover:shadow-lg        select-none
    "
          onClick={() => setShowPlusMenu(!showPlusMenu)}
        >
          <img
            src="/image/plus-svgrepo-com.svg"
            className="w-full h-full select-none"
            alt="plus"
          />
        </button>

        {showPlusMenu === true && (
          <div
            className=" w-[240px] absolute  left-[24px] top-[24px] flex flex-col gap-3 bg-white shadow-md
          border-[1px] border-[#E5E9EE] rounded-[4px] text-[16px] font-medium
        "
          >
            <div className="w-[240px] flex flex-col cursor-pointer  py-4 ">
              <div
                className="flex flex-start pl-5 items-center"
                onClick={() => setShowPlusMenu(false)}
              >
                <img
                  src="/image/FMNewFolderIcon.svg"
                  className="w-5 h-5 mr-2"
                  alt="folder"
                />
                Create Folder
              </div>
              <div className="flex justify-center mt-3">
                <div className="w-[200px] border-b-[1px] border-[#C4C4C4]  "></div>
              </div>
            </div>
            <div
              className="w-[240px] flex flex-col cursor-pointer  pb-4 "
              onClick={() => setShowPlusMenu(false)}
            >
              <div className="flex flex-start pl-5 items-center">
                <img
                  src="/image/FMNewFileIcon.svg"
                  className="w-5 h-5 mr-2"
                  alt="folder"
                />
                Upload Files
              </div>
            </div>{" "}
            <div
              className="w-[240px] flex flex-col cursor-pointer  pb-4 "
              onClick={() => setShowPlusMenu(false)}
            >
              <div className="flex flex-start pl-5 items-center">
                <img
                  src="/image/FMNewFolderIcon.svg"
                  className="w-5 h-5 mr-2"
                  alt="folder"
                />
                Upload Folder
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute  bottom-0 right-0 left-5 top-0 flex flex-col  mt-3 leftsidebar h-[calc(100vh-160px)] hover: overflow-y-auto">
        <div className="text-[#212121] mt-5  font-bold">Directory</div>

        <FMTreeView
          treeData={treeData}
          handleSelect={handleSelect}
          selectedNode={selectedNode}
        />
      </div>
    </div>
  );
};

export default FMTreeSideBar;
