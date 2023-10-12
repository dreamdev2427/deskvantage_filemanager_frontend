import { useState } from "react";
import FMTreeView from "../Components/FMTreeView";

const FMTreeSideBar = () => {
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
      <FMTreeView />
    </div>
  );
};

export default FMTreeSideBar;
