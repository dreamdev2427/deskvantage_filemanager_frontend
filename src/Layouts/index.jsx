import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { togglePlaylist, toggleNote, toggleSearch, setLeftSidebarWidth, setRightSidebarWidth } from "@/redux-toolkit/reducers/Sidebar";

// layouts
import NavBar from "./NavBar";
import NoteSideBar from "./NoteSideBar";
import PlaylistSideBar from "./PlaylistSideBar";
import SearchSideBar from "./SearchSideBar";

// components
import TMediaController from "@/Components/TMediaController";

// constant
import { NOTE_SIDEBAR, PLAYLIST_SIDEBAR, RESIZED_SIDEBAR, SEARCH_SIDEBAR, PREVENT_SELECT } from "@/utils/constant";
import { EventBus } from "@/utils/function";

const MainLyt = () => {
  const dispatch = useDispatch();

  const { minWidth, maxWidth, defaultWidth, playlistOrder, noteOrder, searchOrder, leftSidebarWidth, rightSidebarWidth } = useSelector((state) => state.sidebar);
  const isNowLeftResizing = useRef(false);
  const isNowRightResizing = useRef(false);
  
  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        e.preventDefault();
        dispatch(toggleSearch())
      }
    });
    
    window.addEventListener('mousemove', function (e) {
      if (!isNowLeftResizing.current && !isNowRightResizing.current) return;
      EventBus.dispatch(PREVENT_SELECT, true);
      if (isNowLeftResizing.current) {
        const newWidth = leftSidebarWidth + (e.screenX - leftSidebarWidth);
        if (newWidth >= minWidth && newWidth <= maxWidth)
          dispatch(setLeftSidebarWidth(newWidth));
      }
      if (isNowRightResizing.current) {
        const newWidth = rightSidebarWidth + ((this.window.innerWidth - rightSidebarWidth) - e.screenX);
        if (newWidth >= minWidth && newWidth <= maxWidth)
          dispatch(setRightSidebarWidth(newWidth));
      }
    });
    
    window.addEventListener('mouseup', () => {
      isNowLeftResizing.current = false;
      isNowRightResizing.current = false;
      EventBus.dispatch(PREVENT_SELECT, false);
    });

    return () => {
      window.removeEventListener("keydown", () => {});
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mouseup", () => {});
    };
  }, [])

  const getLeftSidebar = () => {
    return playlistOrder > noteOrder ? playlistOrder > searchOrder ? PLAYLIST_SIDEBAR : SEARCH_SIDEBAR : noteOrder > searchOrder ? NOTE_SIDEBAR : SEARCH_SIDEBAR;
  }

  const getRightSidebar = () => {
    return playlistOrder < noteOrder ? playlistOrder < searchOrder ? PLAYLIST_SIDEBAR : SEARCH_SIDEBAR : noteOrder < searchOrder ? NOTE_SIDEBAR : SEARCH_SIDEBAR;
  }

  useEffect(() => {
    EventBus.dispatch(RESIZED_SIDEBAR, RESIZED_SIDEBAR);
  }, [leftSidebarWidth, rightSidebarWidth])

  const leftSidebarMouseDown = (e) => {
    isNowLeftResizing.current = true;
  }

  const rightSidebarMouseDown = (e) => {
    isNowRightResizing.current = true;
  }

  return (
    <>
      <NavBar />

      <div className="flex mt-[82px] mb-[102px]">
        {(playlistOrder > 1 || noteOrder > 1 || searchOrder > 1) && (
          <div className="flex fixed z-40 bg-white">
            <div style={{width: leftSidebarWidth}}>
              <div className={`${getLeftSidebar() === PLAYLIST_SIDEBAR ? "" : "hidden"}`}><PlaylistSideBar close={() => dispatch(togglePlaylist())} /></div>
              <div className={`${getLeftSidebar() === NOTE_SIDEBAR ? "" : "hidden"}`}><NoteSideBar close={() => dispatch(toggleNote())} /></div>
              <div className={`${getLeftSidebar() === SEARCH_SIDEBAR ? "" : "hidden"}`}><SearchSideBar close={() => dispatch(toggleSearch())} /></div>
            </div>
            <div className="w-1 border-l-2 cursor-col-resize border-blue-gray-50" onMouseDown={leftSidebarMouseDown}></div>
          </div>
        )}
        <div style={{marginLeft: leftSidebarWidth + "px", marginRight: rightSidebarWidth + "px"}}>
          <Outlet />
        </div>
        {(playlistOrder < -1 || noteOrder < -1 || searchOrder < -1) && (
          <div className="flex fixed right-0 z-40 bg-white">
            <div className="w-1 border-r-2 cursor-col-resize border-blue-gray-50" onMouseDown={rightSidebarMouseDown}></div>
            <div style={{width: rightSidebarWidth}}>
              <div className={`${getRightSidebar() === PLAYLIST_SIDEBAR ? "" : "hidden"}`}><PlaylistSideBar close={() => dispatch(togglePlaylist())} /></div>
              <div className={`${getRightSidebar() === NOTE_SIDEBAR ? "" : "hidden"}`}><NoteSideBar close={() => dispatch(toggleNote())} /></div>
              <div className={`${getRightSidebar() === SEARCH_SIDEBAR ? "" : "hidden"}`}><SearchSideBar close={() => dispatch(toggleSearch())} /></div>
            </div>
          </div>
        )}
      </div>

      <TMediaController />
    </>
  );
};

export default MainLyt;