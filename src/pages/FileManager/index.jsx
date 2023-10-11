import { useEffect, useRef, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSearch,
  setLeftSidebarWidth,
  setRightSidebarWidth,
} from "@/redux-toolkit/reducers/Sidebar";

// layouts
import NavBar from "../../Layouts/NavBar";
// import FMTreeSideBar from "../../Layouts/FMTreeSideBar";
import FMMuiTreeSideBar from "../../Layouts/FMMuiTreeSideBar";
import FMMiddlePanel from "../../Layouts/FMMiddlePanel";
import FMRightSideBar from "../../Layouts/FMRightSideBar";

// constant
import { RESIZED_SIDEBAR, PREVENT_SELECT } from "@/utils/constant";
import { EventBus } from "@/utils/function";

import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbNameMap = {
  "/filemanage": "Media",
  "/filemanage/mines": "My Files",
  "/transcripts": "Transcripts",
  "/transcripts/tasklist": "List of tasks",
  "/transcripts/editor": "Editor",
  "/users/clients": "Users",
  "/users/myteam": "My team",
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

const MainLyt = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const {
    minWidth,
    maxWidth,
    leftSidebarWidth,
    rightSidebarWidth,
  } = useSelector((state) => state.sidebar);

  const { selectedNode, pathToSelectedNode } = useSelector(
    (state) => state.treeview
  );

  const [showLeftSideBar, setShowLeftSideBar] = useState(true);
  const [showRightSideBar, setShowRightSideBar] = useState(true);
  const [showLeftBarOnMobile, setShowLeftBarOnMobile] = useState(false);
  const [showRightBarOnMobile, setShowRightBarOnMobile] = useState(false);
  const isNowLeftResizing = useRef(false);
  const isNowRightResizing = useRef(false);

  useEffect(() => {
    if (window) {
      if (window.innerWidth <= 800) {
        setShowLeftBarOnMobile(false);
        setShowRightBarOnMobile(false);
        setShowLeftSideBar(false);
        setShowRightSideBar(false);
        dispatch(setLeftSidebarWidth(0));
        dispatch(setRightSidebarWidth(0));
      } else {
        setShowLeftBarOnMobile(false);
        setShowRightBarOnMobile(false);
        setShowLeftSideBar(true);
        setShowRightSideBar(true);
        dispatch(setLeftSidebarWidth(350));
        dispatch(setRightSidebarWidth(350));
      }
    }

    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        e.preventDefault();
        dispatch(toggleSearch());
      }
    });

    window.addEventListener("mousemove", function (e) {
      if (!isNowLeftResizing.current && !isNowRightResizing.current) return;
      EventBus.dispatch(PREVENT_SELECT, true);
      if (isNowLeftResizing.current) {
        // const newWidth = leftSidebarWidth + (e.screenX - leftSidebarWidth);
        const newWidth = e.clientX;

        if (newWidth >= minWidth && newWidth <= maxWidth)
          dispatch(setLeftSidebarWidth(newWidth));
      }
      if (isNowRightResizing.current) {
        const newWidth =
          rightSidebarWidth +
          (this.window.innerWidth - rightSidebarWidth - e.clientX);
        if (newWidth >= minWidth && newWidth <= maxWidth)
          dispatch(setRightSidebarWidth(newWidth));
      }
    });

    window.addEventListener("mouseup", () => {
      isNowLeftResizing.current = false;
      isNowRightResizing.current = false;
      EventBus.dispatch(PREVENT_SELECT, false);
    });

    window.addEventListener("resize", () => {
      if (window) {
        if (window.innerWidth <= 800) {
          setShowLeftBarOnMobile(false);
          setShowRightBarOnMobile(false);
          setShowLeftSideBar(false);
          setShowRightSideBar(false);
          dispatch(setLeftSidebarWidth(0));
          dispatch(setRightSidebarWidth(0));
        } else {
          setShowLeftBarOnMobile(false);
          setShowRightBarOnMobile(false);
          setShowLeftSideBar(true);
          setShowRightSideBar(true);
          dispatch(setLeftSidebarWidth(350));
          dispatch(setRightSidebarWidth(350));
        }
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mouseup", () => {});

      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    EventBus.dispatch(RESIZED_SIDEBAR, RESIZED_SIDEBAR);
  }, [leftSidebarWidth, rightSidebarWidth]);

  const leftSidebarMouseDown = () => {
    isNowLeftResizing.current = true;
  };

  const rightSidebarMouseDown = () => {
    isNowRightResizing.current = true;
  };

  return (
    <div className="h-full ">
      <NavBar />
      <div className="flex z-20 bg-white justify-between w-full h-[60px] items-center border-b-[#dee0e4] border-b-[1px] top-[82px] fixed">
        <Breadcrumbs
          aria-label="breadcrumb"
          className={`flex items-center h-5 py-0 my-0 bg-transparent`}
          style={{ marginLeft: `${leftSidebarWidth + 10}px` }}
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Typography color="text.primary">Site</Typography>
          {pathToSelectedNode &&
            pathToSelectedNode.length > 0 &&
            pathToSelectedNode.map((value, index) => {
              const last = index === pathToSelectedNode.length - 1;
              const to = `/${pathToSelectedNode.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography color="text.primary" key={to}>
                  {value?.label}
                </Typography>
              ) : (
                <div underline="hover" color="inherit" key={to}>
                  {value?.label}
                </div>
              );
            })}
        </Breadcrumbs>
      </div>
      <div className="mt-[142px] flex h-full relative">
        <div
          className="fixed  left-0  bg-white h-full"
          style={{
            width:
              showLeftBarOnMobile === true ? `350px` : `${leftSidebarWidth}px`,
            display: `${
              (showLeftSideBar || showLeftBarOnMobile) === true
                ? "flex"
                : "hidden"
            }`,
            zIndex: `${showLeftBarOnMobile === true ? 30 : 20}`,
          }}
        >
          {/* <FMTreeSideBar /> */}
          <FMMuiTreeSideBar
            showOrHide={(showLeftSideBar || showLeftBarOnMobile) === true}
          />
          <div
            className="w-1 border-l-2 cursor-col-resize border-blue-gray-50 "
            onMouseDown={leftSidebarMouseDown}
          ></div>
        </div>
        <div
          style={{
            marginLeft: leftSidebarWidth + "px",
            marginRight: rightSidebarWidth + "px",
            width: `calc(100% - ${
              Number(leftSidebarWidth) + Number(rightSidebarWidth)
            }px)`,
          }}
        >
          <FMMiddlePanel />
        </div>
        <div
          className=" fixed right-0 z-20 bg-white h-full"
          style={{
            width:
              showRightBarOnMobile === true
                ? `350px`
                : `${rightSidebarWidth}px`,
            display: `${
              (showRightSideBar || showRightBarOnMobile) === true
                ? "flex"
                : "hidden"
            }`,
            zIndex: `${showRightBarOnMobile === true ? 30 : 20}`,
          }}
        >
          <div
            className="w-1 border-r-2 cursor-col-resize border-blue-gray-50 h-full"
            onMouseDown={rightSidebarMouseDown}
          ></div>
          <FMRightSideBar />
        </div>
        {leftSidebarWidth === 0 && (
          <div
            className="left-0 top-[50vh] z-50 fixed bg-[#E9F0FD] py-3 pl-3 px-3 rounded-r-full cursor-pointer shadow-md"
            onClick={() => {
              setShowLeftBarOnMobile(!showLeftBarOnMobile);
            }}
          >
            <img
              src="/image/blueRightArrow.svg"
              className="w-10 h-10"
              alt="right arrow"
            />
          </div>
        )}
        {rightSidebarWidth === 0 && (
          <div
            className="right-0 top-[50vh] z-50 fixed  bg-[#E9F0FD] py-3 pr-3 px-3 rounded-l-full cursor-pointer shadow-md"
            onClick={() => setShowRightBarOnMobile(!showRightBarOnMobile)}
          >
            <img
              src="/image/blueLeftArrow.svg"
              className="w-10 h-10"
              alt="right arrow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLyt;
