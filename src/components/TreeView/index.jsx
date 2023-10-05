// Treeview.js

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; // Ensure the correct path

const TreeNode = ({ node, index, moveNode }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NODE,
    item: { id: node.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.NODE,
    hover: (dragged) => {
      if (dragged.id !== node.id) {
        moveNode(dragged.id, node.id, index);
        dragged.index = index;
      }
    },
  });


    
  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* Render your tree node content here */}
      {node.name}
      {node.children && (
        <div style={{ marginLeft: '20px' }}>
          {node.children.map((childNode, childIndex) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              index={childIndex}
              moveNode={moveNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Treeview = ({ treeData, moveNode, setTreeData }) => {


    const updateTreeData = (newTreeData) => {
        // Update the state or perform any necessary action with the new tree data
        // For example, if you're using state, you might do something like:
        setTreeData(newTreeData);
      };
    
    
  const handleMoveNode = (draggedId, targetId, targetIndex) => {
    const newTreeData = [...treeData];

    // Find the dragged node
    const draggedNode = findNode(newTreeData, draggedId);

    // Remove the dragged node from its original position
    const removedNode = removeNode(newTreeData, draggedId);

    // Find the target node
    const targetNode = findNode(newTreeData, targetId);

    // Insert the dragged node into the target node's children at the target index
    if (targetNode) {
      targetNode.children = insertNode(targetNode.children, draggedNode, targetIndex);
    }

    // Update the tree data
    updateTreeData(newTreeData);
  };

  const findNode = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const foundNode = findNode(node.children, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  };

  const removeNode = (nodes, id) => {
    const index = nodes.findIndex((node) => node.id === id);
    if (index !== -1) {
      return nodes.splice(index, 1)[0];
    }
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        const removedNode = removeNode(node.children, id);
        if (removedNode) {
          return removedNode;
        }
      }
    }
    return null;
  };

  const insertNode = (nodes, newNode, index) => {
    return [...nodes.slice(0, index), newNode, ...nodes.slice(index)];
    };
    

  return (
    <div>
           {treeData.map((node, index) => (
        <TreeNode key={node.id} node={node} index={index} moveNode={handleMoveNode} />
      ))}
    </div>
  );
};

export default Treeview;
