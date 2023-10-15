import * as React from "react";
import JqxTree, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";
import "./jqx.base.css";
import "./jqx.fluent.css";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/FilePresent";

import "jqwidgets-framework/jqwidgets/jqxcore"; // Import jqxCore library
import "jqwidgets-framework/jqwidgets/jqxtree";
import { treeData } from "../../utils/constant";
import { findNodeById } from "../../utils/function";

// // Create a recursive function to convert hierarchical data into dataAdapter format
// function convertToDataAdapterFormat(node) {
//   const result = {
//     id: node.id,
//     label: node.label,
//     isFolder: node.isFolder,
//     children: [],
//   };

//   if (node.children && node.children.length > 0) {
//     result.children = [];
//     for (const child of node.children) {
//       result.children.push(convertToDataAdapterFormat(child));
//     }
//   }

//   return result;
// }

// // Convert the hierarchical data to dataAdapter format
// const dataAdapterData = convertToDataAdapterFormat(treeData);

// var source = {
//   datatype: "json",
//   datafields: [
//     { name: "id" },
//     { name: "label" },
//     { name: "isFolder" },
//     { name: "children" },
//   ],
//   id: "id",
//   localdata: dataAdapterData,
// };
// var dataAdapter = new jqx.dataAdapter(source, { autoBind: true });

// console.log("dataAdapter.records >>> ", dataAdapter.records);

const TreeView = (props) => {
  const treeA = React.createRef<JqxTree>();
  const textarea = React.createRef<HTMLTextAreaElement>();
  const [pressedNode, setPressedNode] = React.useState({});
  const [dataSource, setDataSource] = React.useState(treeData);

  const handleClickNode = (event, nodeid) => {
    props.handleSelect(event, nodeid);
    let temp = pressedNode;
    temp = { ...temp, [nodeid]: !(temp[nodeid] || false) };
    setPressedNode(temp);
    setTimeout(() => {
      setPressedNode({});
    }, 5000);
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
                  <div className="ml-1 text-[14px] font-medium text-[#212121] ">
                    {node.label && node.label.toString()?.length > 15 ? (
                      <div className="relative group">
                        {node.label.toString().substring(0, 20) + "..."}

                        <div
                          className={`hidden group-hover:${
                            pressedNode[node.id] !== true ? "block" : "hidden"
                          } left-10  w-max fixed px-2 py-2 rounded-lg text-sm font-medium bg-gray-600 text-white`}
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
    // console.log(dropItem); //that is just accepted an item
    // console.log(args);
    // console.log(dropPosition);
    // console.log(tree);
    if (dragItem.parentId === dropItem.id) return false;
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

    if (treeA.current!.val()!.isExpanded === false) {
      treeA.current!.expandItem(item);
      treeA.current!.selectItem(null);
    } else {
      treeA.current!.collapseItem(item);
      treeA.current!.selectItem(null);
    }
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
            onDragStart={dragStartTreeA}
            onDragEnd={dragEndTreeA}
            dragStart={dragStart}
            dragEnd={dragEnd}
          >
            {rendertree(dataSource)}
          </JqxTree>
        )}
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
