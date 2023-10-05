// App.js
import React, { useState } from 'react';
import ResizablePanel from './components/ResizablePanel';

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
        height={panelHeight}
        onResize={handleResize2}
      >
        Resizable Panel2
      </ResizablePanel>

      {/* Center panel */}
      <ResizablePanel
        width={panelWidth}
        height={panelHeight}
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
