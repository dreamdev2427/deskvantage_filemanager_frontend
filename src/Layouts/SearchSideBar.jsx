
import { useState } from "react";

//material
import { Input } from "@material-tailwind/react";

// icons
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const SearchSideBar = ({ close, show }) => {
  const [schWord, setSchWord] = useState("sagittis");

  const matches = [
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 1
    },
    {
      content: "justo eget, sagittis odio. Nullam ut turpis commodo, tempor lacus quis, iaculis nibh. Pellentesque et erat ac",
      speakerId: 2
    }
  ]

  return (
    <>
      <div className='w-full h-[calc(100vh-160px)] shadow-xl shadow-blue-gray-900/5 ease-in-out duration-300'>
        <div className="flex justify-between ml-5 mr-4 py-3">
          <p className="text-base text-custom-black font-bold self-center">Search by Word</p>
          <AiOutlineClose onClick={() => close()} className="w-[30px] h-[30px] self-center text-custom-sky bg-custom-sky-gray p-1 cursor-pointer rounded-full" />
        </div>
        <hr className="border-blue-gray-50 mb-8" />
        <div className="mx-[22px] mb-7">
          <Input label="Enter word for search" value={schWord} onChange={(e) => setSchWord(e.target.value) }/>
        </div>
        <div className="flex justify-between mx-[22px] mb-7">
          <p className="font-bold text-sm text-custom-black self-center">Result: 2 matches</p>
          <div className="flex gap-1">
            <MdKeyboardArrowLeft className="w-[30px] h-[30px] bg-custom-white text-custom-gray border-[1px] border-custom-light-gray cursor-pointer rounded" />
            <MdKeyboardArrowRight className="w-[30px] h-[30px] bg-custom-white text-custom-gray border-[1px] border-custom-light-gray cursor-pointer rounded" />
          </div>
        </div>
        <div className="h-[calc(100%-249px)] scrollbar overflow-auto scrollPaddingRight grid gap-7 ml-[22px] mr-1.5">
          {matches.map((match, index) => {
            return <p key={index} className="text-custom-gray text-[13px]" dangerouslySetInnerHTML={{__html: match.content.replace(schWord, "<b style='color:black' >" + schWord + "</b>") + " (" + match.speakerId+")" }} />
          })}
        </div>
      </div>
    </>
  );
};

export default SearchSideBar;
