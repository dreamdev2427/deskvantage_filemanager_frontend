import * as React from "react";
import JqxTree from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";
import "./jqx.base.css";
import "./jqx.fluent.css";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/FilePresent";

const TreeView = (props) => {
  const treeA = React.createRef<JqxTree>();
  const textarea = React.createRef<HTMLTextAreaElement>();

  const handleClickNode = (event, nodeid) => {
    props.handleSelect(event, nodeid);
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
                  ) : node.children ? (
                    <FolderIcon
                      sx={{ width: "18px", height: "18px", fill: "#4489fe" }}
                    />
                  ) : (
                    <FileIcon
                      sx={{ width: "18px", height: "18px", fill: "#4489fe" }}
                    />
                  )}
                  <div className="ml-1 text-[14px] font-medium text-[#212121] relative group">
                    {node.label && node.label.toString()?.length > 15 ? (
                      <div className="relative">
                        {node.label.toString().substring(0, 20) + "..."}
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
    if (item.label === "Community") {
      return false;
    }

    return true;
  };

  const dragEnd = (item: any) => {
    if (item.label === "Forum") {
      return false;
    }

    return true;
  };

  // Event handling
  const onDragStart = (event: any) => {};

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
        <JqxTree
          theme={"material-purple"}
          ref={treeA}
          style={{
            float: "left",
            marginLeft: "0px",
          }}
          onDragStart={dragStartTreeA}
          onDragEnd={dragEndTreeA}
          dragStart={dragStart}
        >
          {rendertree(props.treeData)}
        </JqxTree>
        <div
          style={{
            width: "0px",
            height: "0px",
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

export default TreeView;
