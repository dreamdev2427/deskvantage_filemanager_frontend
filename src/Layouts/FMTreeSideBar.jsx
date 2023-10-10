import { useState } from "react";
import FMTreeView from "../Components/FMTreeView";

const FMTreeSideBar = () => {
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  return (
    <div className="flex w-full flex-col pl-4 relative h-full">
      <div className="absolute -top-[23px] right-[46px]">
        <button
          className=" flex items-center justify-center h-[46px] w-[46px] 
        rounded-full shadow-md hover:shadow-lg        
      "
          onClick={() => setShowPlusMenu(!showPlusMenu)}
        >
          <img
            src="/image/plus-svgrepo-com.svg"
            className="w-full h-full"
            alt="plus"
          />
        </button>

        {showPlusMenu === true && (
          <div
            className="w-[240px] absolute z-10 left-[24px] top-[24px] flex flex-col gap-3 bg-white shadow-md
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
      <div className="text-[#212121] mt-5 font-bold">Directory</div>
      <div className="flex mt-3">
        <img
          src="/image/FMHomeIcon.svg"
          className="w-[18px] h-[18px]"
          alt="home icon"
        />
        <div className="text-[#212121] text-[13px] font-bold ml-2">Site</div>
      </div>
      <FMTreeView />
    </div>
  );
};

export default FMTreeSideBar;
