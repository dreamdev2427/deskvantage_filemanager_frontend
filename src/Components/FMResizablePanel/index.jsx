// ResizablePanel.js

import { Resizable } from "react-resizable";
import "./ResizablePanel.css"; // Import the styles

const ResizablePanel = ({ onResize, width, children }) => {
  return (
    <Resizable
      width={width}
      height={1366}
      onResize={onResize}
      draggableOpts={{ grid: [25, 25] }}
      className="resizable-panel"
    >
      <div className="content" style={{ width: width + "px" }}>
        {children}
      </div>
    </Resizable>
  );
};

export default ResizablePanel;
