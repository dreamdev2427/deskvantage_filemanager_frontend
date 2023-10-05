// ResizablePanel.js
import React from 'react';
import { Resizable } from 'react-resizable';
import './ResizablePanel.css'; // Import the styles

const ResizablePanel = ({ onResize, width, height, children }) => {
  return (
    <Resizable
      width={width}
      height={height}
      onResize={onResize}
      draggableOpts={{ grid: [25, 25] }}
      className="resizable-panel"
    >
      <div className="content" style={{width: width + 'px', height: height + 'px'}}>
              { children}
        </div>
    </Resizable>
  );
};

export default ResizablePanel;
