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
import FMTreeSideBar from "../../Layouts/FMTreeSideBar";
import FMMiddlePanel from "../../Layouts/FMMiddlePanel";
import FMRightSideBar from "../../Layouts/FMRightSideBar";

// constant
import { RESIZED_SIDEBAR, PREVENT_SELECT } from "@/utils/constant";
import { EventBus } from "@/utils/function";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/FilePresent";
import {
  setPathToSelectedNode,
  setSelectedNode,
} from "../../redux-toolkit/reducers/TreeView";
import Popup from "@mui/material/Popover";
import { treeData } from "../../utils/constant";
import { findChildren, findPath } from "../../utils/function";

const MainLyt = () => {
  const dispatch = useDispatch();

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
  const [showBreadcrumbDropdown, setShowBreadCrumbDropdown] = useState({});
  const isNowLeftResizing = useRef(false);
  const isNowRightResizing = useRef(false);
  const [anchorEl, setAnchorEl] = useState({});
  const [expanded, setExpanded] = useState([]);

  const handleExpand = (index) => {
    if (expanded.includes(index)) {
      setExpanded(expanded.filter((item) => item !== index));
    } else {
      setExpanded([...expanded, index]);
    }
  };

  const handleBreadcrumbClick = (nodeId) => {
    let temp = showBreadcrumbDropdown;
    temp = { ...temp, [nodeId]: !showBreadcrumbDropdown[nodeId] || false };
    let keys = Object.keys(temp);
    keys.forEach((key) => {
      if (key !== nodeId) {
        temp[key] = false;
      }
    });
    setShowBreadCrumbDropdown(temp);
  };

  const controllSidbars = () => {
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
  };

  useEffect(() => {
    if (selectedNode) {
      const path = findPath(treeData, selectedNode);
      dispatch(setPathToSelectedNode(path));
    }
  }, [selectedNode]);

  useEffect(() => {
    controllSidbars();

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
      controllSidbars();
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

  const handleClick = (event, nodeId) => {
    let temp = anchorEl;
    temp = { ...temp, [nodeId]: event.currentTarget };
    let keys = Object.keys(temp);
    keys.forEach((key) => {
      if (key !== nodeId) {
        temp[key] = false;
      }
    });
    setAnchorEl(temp);
    handleBreadcrumbClick(nodeId);
  };

  const handleClose = (event, nodeId) => {
    let temp = anchorEl;
    temp = { ...temp, [nodeId]: null };
    let keys = Object.keys(temp);
    keys.forEach((key) => {
      if (key !== nodeId) {
        temp[key] = false;
      }
    });
    setAnchorEl(temp);
    handleBreadcrumbClick(nodeId);
  };

  const renderBreadcrumbItem = (
    value,
    index,
    handleExpand,
    handleClick,
    handleClose
  ) => (
    <div
      key={index}
      onClick={(e) => {
        handleExpand(index);
        handleClick(e, value.id);
      }}
      className="flex gap-2 items-center"
    >
      <div className={``}>
        {value?.label?.toString()?.length > 20
          ? value?.label?.toString().substring(0, 20) + "..."
          : value?.label}
      </div>
      {expanded.includes(index) ? (
        <ExpandMoreIcon fontSize="small" />
      ) : (
        <ExpandMoreIcon
          fontSize="small"
          style={{ transform: "rotate(-90deg)" }}
          onClick={(e) => handleClose(e, value.id)}
        />
      )}
      <Popup
        id={`fmBreadcrumbPopup_${value.id}`}
        open={showBreadcrumbDropdown[value.id] || false}
        anchorEl={anchorEl[value.id]}
        onClose={(e) => handleClose(e, value.id)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="flex w-max px-4 py-4 h-max left-[50%] bg-white flex-col gap-1 border-[1px] border-[#E5E9EE] rounded-[4px] text-[16px] font-medium max-h-[400px] overflow-y-auto">
          {findChildren(treeData, value.id)?.length > 0 &&
            findChildren(treeData, value.id)?.map((item, index2) => (
              <div
                key={index2}
                className="flex items-center bg-white hover:bg-[rgba(25,118,210,0.12)] px-2 py-2"
                onClick={() => {
                  handleClose(null, item.id);
                  dispatch(setSelectedNode(item.id));
                }}
              >
                {item.isFolder === true ? (
                  <FolderIcon
                    sx={{ width: "18px", height: "18px", fill: "#4489fe" }}
                  />
                ) : (
                  <FileIcon
                    sx={{ width: "18px", height: "18px", fill: "#4489fe" }}
                  />
                )}
                <span
                  className={`ml-2 ${
                    item.id === pathToSelectedNode[index + 1]?.id
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
        </div>
      </Popup>
    </div>
  );

  const renderBreadcrumbs = (breadcrumbs) => (
    <Breadcrumbs
      maxItems={4}
      aria-label="breadcrumb"
      className={`flex justify-start my-0 bg-transparent ml-2 w-[calc(100% - 20px)] `}
      separator=""
    >
      {breadcrumbs &&
        breadcrumbs.length > 0 &&
        breadcrumbs.map((value, index) =>
          index === breadcrumbs.length - 1 ? (
            <Typography key={index} color="text.primary" className={``}>
              {value?.label?.toString()?.length > 20
                ? value?.label?.toString().substring(0, 20) + "..."
                : value?.label}
            </Typography>
          ) : (
            renderBreadcrumbItem(
              value,
              index,
              handleExpand,
              handleClick,
              handleClose
            )
          )
        )}
    </Breadcrumbs>
  );

  const renderEllipsis = () => <div className="font-bold mx-2">...</div>;

  const renderBreadcrumbsContainer = () => (
    <div className="flex flex-start">
      {pathToSelectedNode?.length > 0 && renderEllipsis()}
      {renderBreadcrumbs(
        pathToSelectedNode?.length > 4
          ? pathToSelectedNode.slice(-4)
          : pathToSelectedNode
      )}
    </div>
  );

  return (
    <div className="h-full overflow-x-auto">
      <NavBar />
      <div className="fixed flex z-30 bg-white justify-start w-full h-[60px] py-4   items-center border-b-[#dee0e4] border-b-[1px] top-[82px] ">
        <Typography
          color="text.primary"
          style={{ marginLeft: `${leftSidebarWidth + 10}px` }}
        >
          Site
        </Typography>
        <NavigateNextIcon fontSize="small" className="ml-2" />
        {pathToSelectedNode && pathToSelectedNode.length <= 4
          ? renderBreadcrumbs(pathToSelectedNode)
          : renderBreadcrumbsContainer()}
      </div>
      <div className="mt-[142px] flex h-full relative w-full overflow-x-visible">
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
            zIndex: `${showLeftBarOnMobile === true ? 35 : 30}`,
          }}
        >
          <FMTreeSideBar
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
            overflowX: "visible",
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
            className="w-1 border-r-2 cursor-col-resize border-blue-gray-50 "
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
              src="/image/FileManagement/blueRightArrow.svg"
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
              src="/image/FileManagement/blueLeftArrow.svg"
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
