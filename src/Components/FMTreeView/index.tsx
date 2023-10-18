import * as React from "react";
import JqxTree from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";
import "./jqx.base.css";
import "./jqx.fluent.css";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/FilePresent";

import "jqwidgets-framework/jqwidgets/jqxcore"; // Import jqxCore library
import "jqwidgets-framework/jqwidgets/jqxtree";
import { FM_TITLE_COLOR, treeData } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDraggingStatus } from "../../redux-toolkit/reducers/FMDragDrop";

const FMTreeView = (props) => {
  const treeA = React.createRef<JqxTree>();
  const textarea = React.createRef<HTMLTextAreaElement>();
  const { isDragging, draggingElements } = useSelector(
    (state) => state.fmdragdrop
  );
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = React.useState(treeData);

  const handleClickNode = (event, nodeid) => {
    props.handleSelect(event, nodeid);
    const item = treeA.current!.getItem(event.target);
    treeA.current!.selectItem(item);
  };

  const rendertree = (treedata) => {
    return (
      <ul key={treedata.id}>
        {Array.isArray(treedata.children)
          ? treedata.children.map((node) => (
              <li
                key={node.id}
                onClick={(event) => {
                  event.stopPropagation();
                  handleClickNode(event, node.id);
                }}
              >
                <div className="flex">
                  {node.id === "root" ? (
                    <></>
                  ) : node?.isFolder === true ? (
                    <FolderIcon
                      sx={{ width: "18px", height: "18px", fill: "#4489fe" }}
                    />
                  ) : (
                    <FileIcon
                      sx={{ width: "18px", height: "18px", fill: "#4489fe" }}
                    />
                  )}
                  <div
                    className={`ml-1 text-[14px] font-medium text-[${FM_TITLE_COLOR}] `}
                  >
                    {node.label && node.label.toString()?.length > 20 ? (
                      <div className="relative group">
                        {node.label.toString().substring(0, 20) + "..."}
                        <div
                          className={`hidden group-hover:block left-10  w-max fixed px-2 py-2 rounded-lg text-sm font-medium bg-gray-600 text-white`}
                        >
                          {node.label}
                        </div>
                      </div>
                    ) : (
                      node.label
                    )}
                  </div>
                </div>
                {rendertree(node)}
              </li>
            ))
          : null}
      </ul>
    );
  };

  // Definitions for the properties-callbacks
  const dragStart = (item: any) => {
    if (item.label === "root") {
      return false;
    }

    return true;
  };

  // Event handling
  const onDragStart = (event: any) => {};

  const dragEnd = (
    dragItem: any,
    dropItem: any,
    args: any,
    dropPosition: any,
    tree: any
  ): any => {
    // console.log(dragItem); //that is just dragged and put down
    // console.log("dropItem  >>> ", dropItem); //that is just accepted an item
    // console.log(args);
    // console.log(dropPosition);
    // console.log(tree);
    if (dragItem.parentId === dropItem.id) return false;
    console.log(
      "dropItem.element children[0] innerHTML >>> ",
      dropItem.element.children[0].innerHTML
    );
    if (dropItem.element.children[0].innerHTML != "") return false;
  };

  const onDragEnd = (event: any) => {
    const args = event.args;

    if (!!args.label) {
      const ev = event.args.originalEvent;
      let x = ev.pageX;
      let y = ev.pageY;
      if (
        event.args.originalEvent &&
        event.args.originalEvent.originalEvent &&
        event.args.originalEvent.originalEvent.touches
      ) {
        const touch = event.args.originalEvent.originalEvent.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
      }
      const rect = textarea.current.getBoundingClientRect();
      const width = textarea.current.clientWidth;
      const height = textarea.current.clientHeight;
      const right = rect.left + width;
      const bottom = rect.top + height;
      if (x >= rect.left && x <= right) {
        if (y >= rect.top && y <= bottom) {
          textarea.current!.value = event.args.label;
        }
      }
    }
  };

  const dragStartTreeA = (event: Event) => {
    onDragStart(event);
  };

  const dragEndTreeA = (event: Event) => {
    onDragEnd(event);
  };

  const myTreeOnExpand = (event: any) => {
    const args = event.args;
    const item = treeA.current!.getItem(args.element);

    if (treeA.current!.val()?.isExpanded === false) {
      treeA.current!.expandItem(item);
    } else {
      treeA.current!.collapseItem(item);
    }
  };

  const dropObj = (event: Event) => {
    let targetElement = null;
    if (
      event.originalEvent.target.parentElement.innerHTML
        .substring(0, 30)
        .includes('svg class="MuiSvgIcon-root') === true
    ) {
      targetElement =
        event.originalEvent.target.parentElement.parentElement.parentElement;
    } else if (
      event.originalEvent.target.parentElement.innerHTML
        .substring(0, 30)
        .includes("path d=") === true
    ) {
      targetElement =
        event.originalEvent.target.parentElement.parentElement.parentElement
          .parentElement;
    } else if (
      event.originalEvent.target.parentElement.innerHTML
        .substring(0, 30)
        .includes('li id="jqxWidget') === true
    ) {
      targetElement = event.originalEvent.target;
    }

    let targetItem = treeA.current!.getItem(targetElement);
    let targetTreeItem = $(targetItem.element).first();
    treeA.current!.addTo(
      `<div class="flex"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1fjwcaq-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FilePresentIcon"><path d="M15 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7l-5-5zM6 20V4h8v4h4v12H6zm10-10v5c0 2.21-1.79 4-4 4s-4-1.79-4-4V8.5c0-1.47 1.26-2.64 2.76-2.49 1.3.13 2.24 1.32 2.24 2.63V15h-2V8.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V15c0 1.1.9 2 2 2s2-.9 2-2v-5h2z"></path></svg><div class="ml-1 text-[14px] font-medium text-[${FM_TITLE_COLOR}] "}><div class="relative group">` +
        draggingElements[0]?.FileName +
        '<div class="hidden group-hover:block left-10  w-max fixed px-2 py-2 rounded-lg text-sm font-medium bg-gray-600 text-white">' +
        draggingElements[0]?.FileName +
        "</div></div></div></div>",
      targetTreeItem.context
    );
    treeA.current!.expandItem(targetItem);

    dispatch(setDraggingStatus(false));
  };

  return (
    <div className="w-full">
      <div
        style={{
          float: "left",
          marginTop: "10px",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        {dataSource !== null && (
          <JqxTree
            onSelect={myTreeOnExpand}
            theme={"material-purple"}
            ref={treeA}
            style={{
              float: "left",
              marginLeft: "0px",
            }}
            className="drop-target"
            onDragStart={dragStartTreeA}
            onDragEnd={dragEndTreeA}
            dragStart={dragStart}
            dragEnd={dragEnd}
            onDrop={dropObj}
            // source={dataSource}
            // renderer={rendertree}
          >
            {rendertree(dataSource)}
          </JqxTree>
        )}
        <div
          style={{
            width: "0",
            height: "0",
            float: "left",
            marginLeft: "20px",
          }}
        >
          <textarea ref={textarea} rows={5} className="w-0 h-0" />
        </div>
      </div>
    </div>
  );
};

export default FMTreeView;
