// App.js
import React, { useState } from 'react';
import ResizablePanel from './components/ResizablePanel';
import TreeView from './components/TreeView';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const RenderFileTree = () => {
  const [treeData, setTreeData] = useState([
    {
      id: 1,
      name: 'Folder 1',
      children: [
        {
          id: 11,
          name: 'Subfolder 1-1',
          children: [
            { id: 111, name: 'File 1-1-1', children: [] },
            { id: 112, name: 'File 1-1-2', children: [] },
          ],
        },
        {
          id: 12,
          name: 'Subfolder 1-2',
          children: [
            { id: 121, name: 'File 1-2-1', children: [] },
            { id: 122, name: 'File 1-2-2', children: [] },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Folder 2',
      children: [
        { id: 21, name: 'File 2-1', children: [] },
        { id: 22, name: 'File 2-2', children: [] },
      ],
    },
    // ...
  ]);
  

  const moveNode = (draggedId, targetId, targetIndex) => {
    // Implement logic to update the treeData
    // You need to update the state to reflect the new tree structure
  };


  return (
    <div>
      <h1>Draggable TreeView</h1>
      <DndProvider backend={HTML5Backend}>
        <TreeView treeData={treeData} moveNode={moveNode} setTreeData={setTreeData} />
        </DndProvider>
    </div>
  );
};



const App = () => {
  const [panelWidth, setPanelWidth] = useState(300);
  const [panelWidth2, setPanelWidth2] = useState(300);
  
  const [panelHeight, setPanelHeight] = useState(1366);

  const handleResize = (event, { size }) => {
    setPanelWidth(size.width);
    setPanelHeight(size.height);
  };
  
  const handleResize2 = (event, { size }) => {
    setPanelWidth2(size.width);
    setPanelHeight(size.height);
  };

  return (
    <div className="flex h-screen">
      
      {/* Left panel */}
      
      <ResizablePanel
        width={panelWidth2}
        onResize={handleResize2}
      >
        Resizable Panel2
        <RenderFileTree />
      </ResizablePanel>

      {/* Center panel */}
      <ResizablePanel
        width={panelWidth}
        onResize={handleResize}
      >
        Resizable Panel
      </ResizablePanel>

      {/* Right panel */}
      <div className="flex-grow">
        Non-resizable Panel
      </div>
    </div>
  );
};

export default App;
