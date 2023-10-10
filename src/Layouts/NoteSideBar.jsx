import React from "react";

// components
import TAlert from "@/Components/TAlert";

// icons
import { AiOutlineClose } from "react-icons/ai";
import { HiPlusCircle } from "react-icons/hi2";

const NoteSideBar = ({ close }) => {
  
  const alerts = [
    {
      title: "New project",
      description: "Nam eu justo nec est efficitur aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      titleClr: "text-custom-sky",
      bgClr: "bg-custom-sky-gray"
    },
    {
      title: "Review John Work",
      description: "Nam eu justo nec est efficitur aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      titleClr: "text-custom-sky",
      bgClr: "bg-custom-sky-gray"
    },
    {
      title: "Speaker 1",
      description: "Nam eu justo nec est efficitur aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      titleClr: "text-custom-sky",
      bgClr: "bg-custom-sky-gray"
    },
    {
      title: "New project",
      description: "Nam eu justo nec est efficitur aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      titleClr: "text-custom-sky",
      bgClr: "bg-custom-sky-gray"
    },
    {
      title: "Review John Work",
      description: "Nam eu justo nec est efficitur aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      titleClr: "text-custom-sky",
      bgClr: "bg-custom-sky-gray"
    },
    {
      title: "Speaker 1",
      description: "Nam eu justo nec est efficitur aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      titleClr: "text-custom-sky",
      bgClr: "bg-custom-sky-gray"
    },
  ]

  return (
    <>
      <div className='w-full h-[calc(100vh-160px)] shadow-xl shadow-blue-gray-900/5 ease-in-out duration-300'>
        <div className="flex justify-between ml-5 mr-4 py-3">
          <div className="flex text-base text-custom-black font-bold">
            <p className="self-center">Notes</p>
            <HiPlusCircle className="text-3xl ml-1 text-custom-sky"/>
          </div>
          <AiOutlineClose onClick={() => close()} className="w-[30px] h-[30px] self-center text-custom-sky bg-custom-sky-gray p-1 cursor-pointer rounded-full" />
        </div>
        <hr className="border-blue-gray-50 mb-7" />
        <div className="h-[calc(100%-119px)] overflow-auto scrollbar ml-[22px] mr-3" >
          <ul className="grid gap-5">
            {alerts.map((item, index) => {
              return (
                <li key={index}>
                  <TAlert
                    key={index}
                    title={item.title}
                    description={item.description}
                    titleClr={item.titleClr}
                    bgClr={item.bgClr}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NoteSideBar;
