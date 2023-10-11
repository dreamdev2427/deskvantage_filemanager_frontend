import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/FilePresent";
import { useEffect, useState } from "react";
import {
  setPathToSelectedNode,
  setSelectedNode,
} from "../redux-toolkit/reducers/TreeView";
import { useDispatch, useSelector } from "react-redux";

export const treeData = {
  id: "root",
  label: "Site",
  children: [
    {
      id: "node1",
      label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 1",
      children: [
        {
          id: "node3",
          label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 3",
          children: [
            {
              id: "node10",
              label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 10",
              children: [
                {
                  id: "node11",
                  label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 11",
                },
                {
                  id: "node12",
                  label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 12",
                },
                {
                  id: "node13",
                  label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 13",
                  children: [
                    {
                      id: "node14",
                      label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 15",
                    },
                    {
                      id: "node16",
                      label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 16",
                      children: [
                        {
                          id: "node18",
                          label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 18",
                          children: [
                            {
                              id: "node35",
                              label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 35",
                            },
                            {
                              id: "node23",
                              label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 23",
                              children: [
                                {
                                  id: "node24",
                                  label:
                                    "qwertyuiopasdfghjklzxcvbnmqwertyuiop 24",
                                },
                                {
                                  id: "node25",
                                  label:
                                    "qwertyuiopasdfghjklzxcvbnmqwertyuiop 25",
                                  children: [
                                    {
                                      id: "node26",
                                      label:
                                        "qwertyuiopasdfghjklzxcvbnmqwertyuiop 26",
                                    },
                                    {
                                      id: "node27",
                                      label:
                                        "qwertyuiopasdfghjklzxcvbnmqwertyuiop 27",
                                      children: [
                                        {
                                          id: "node28",
                                          label:
                                            "qwertyuiopasdfghjklzxcvbnmqwertyuiop 28",
                                        },
                                        {
                                          id: "node29",
                                          label:
                                            "qwertyuiopasdfghjklzxcvbnmqwertyuiop 29",
                                        },
                                        {
                                          id: "node30",
                                          label:
                                            "qwertyuiopasdfghjklzxcvbnmqwertyuiop 30",
                                        },
                                        {
                                          id: "node31",
                                          label:
                                            "qwertyuiopasdfghjklzxcvbnmqwertyuiop 31",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "node22",
                              label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 22",
                            },
                          ],
                        },
                        {
                          id: "node19",
                          label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 19",
                        },
                        {
                          id: "node20",
                          label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 20",
                        },
                      ],
                    },
                    {
                      id: "node17",
                      label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 17",
                    },
                  ],
                },
              ],
            },
          ],
        },
        { id: "node4", label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 4" },
      ],
    },
    { id: "node2", label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 2" },
    {
      id: "node5",
      label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 5",
      children: [
        {
          id: "node6",
          label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 6",
          children: [
            { id: "node7", label: "qwertyuiopasdfghjklzxcvbnmqwertyuiop 7" },
          ],
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0 8px 0",
  },
});

const MyTreeView = ({ treeData, handleSelect }) => {
  const classes = useStyles();
  const { selectedNode } = useSelector((state) => state.treeview);

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      onClick={(event) => handleSelect(event, nodes.id)}
      selected={selectedNode === nodes.id}
      label={
        <div
          className={classes.listItem}
          style={{
            background: `${
              selectedNode === nodes.id
                ? "rgba(25, 118, 210, 0.08)"
                : "transparent"
            }`,
          }}
        >
          {nodes.id === "root" ? (
            <></>
          ) : nodes.children ? (
            <FolderIcon
              sx={{ width: "18px", height: "18px", fill: "#4489fe" }}
            />
          ) : (
            <FileIcon sx={{ width: "18px", height: "18px", fill: "#4489fe" }} />
          )}
          <div className="ml-1 text-[14px] font-medium text-[#212121] relative group">
            {nodes.label && nodes.label.toString()?.length > 15 ? (
              <div className="relative">
                {nodes.label.toString().substring(0, 20) + "..."}
                <div className="hidden group-hover:flex absolute left-0 top-5 w-[330px] z-1024 px-1 bg-[#afafaf] rounded-lg h-[30px] text-white">
                  {nodes.label}
                </div>
              </div>
            ) : (
              nodes.label
            )}
          </div>
        </div>
      }
      icon={
        nodes.id === "root" ? (
          <img
            src="/image/FMHomeIcon.svg"
            className="w-[18px] h-[18px]"
            alt="home icon"
          />
        ) : undefined
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon sx={{ fill: "#4489fe" }} />}
      defaultExpandIcon={<ChevronRightIcon sx={{ fill: "#4489fe" }} />}
      defaultExpanded={[selectedNode]}
    >
      {renderTree(treeData)}
    </TreeView>
  );
};

export function findSiblings(treeData, idToFind, siblings = []) {
  for (const node of treeData.children || []) {
    if (node.id === idToFind) {
      for (const childNode of treeData.children) {
        if (childNode.id !== idToFind) {
          siblings.push({ id: childNode.id, label: childNode.label });
        }
      }
      return siblings;
    }
    findSiblings(node, idToFind, siblings);
  }
  return siblings;
}

export function findChildren(treeData, idToFind, children = []) {
  for (const node of treeData.children || []) {
    if (node.id === idToFind) {
      for (const childNode of node.children || []) {
        children.push({ id: childNode.id, label: childNode.label });
      }
      return children;
    }
    findChildren(node, idToFind, children);
  }
  return children;
}

export function findPath(treeData, idToFind, currentPath = []) {
  for (const node of treeData.children || []) {
    const newPath = currentPath.concat({ id: node.id, label: node.label });

    if (node.id === idToFind) {
      return newPath;
    }

    const pathFound = findPath(node, idToFind, newPath);
    if (pathFound) {
      return pathFound;
    }
  }

  return null;
}

const FileTreeView = (props) => {
  const dispatch = useDispatch();
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showOrHide, setShowOrHide] = useState(false);

  const handleSelect = (event, nodeId) => {
    const path = findPath(treeData, nodeId);
    dispatch(setSelectedNode(nodeId));
    dispatch(setPathToSelectedNode(path));
  };

  useEffect(() => {
    if (props.showOrHide) setShowOrHide(props.showOrHide);
  }, [props]);

  return (
    <div
      className={`w-full flex-col pl-4 relative  ${
        showOrHide === true ? "pl-4 flex relative" : "pl-0 hidden"
      }`}
    >
      <div className="z-50 absolute -top-[23px] right-[46px] select-none cursor-pointer">
        <button
          className=" flex items-center justify-center h-[46px] w-[46px] 
        rounded-full shadow-md hover:shadow-lg        select-none
      "
          onClick={() => setShowPlusMenu(!showPlusMenu)}
        >
          <img
            src="/image/plus-svgrepo-com.svg"
            className="w-full h-full select-none"
            alt="plus"
          />
        </button>

        {showPlusMenu === true && (
          <div
            className=" w-[240px] absolute  left-[24px] top-[24px] flex flex-col gap-3 bg-white shadow-md
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
      <div className="absolute  bottom-0 right-0 left-5 top-0 flex flex-col  mt-3  h-[calc(100vh-160px)] overflow-auto">
        <div className="text-[#212121] mt-5  font-bold">Directory</div>

        <MyTreeView treeData={treeData} handleSelect={handleSelect} />
      </div>
    </div>
  );
};

export default FileTreeView;
