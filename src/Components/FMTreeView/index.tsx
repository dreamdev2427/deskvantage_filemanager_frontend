import * as React from "react";
import JqxTree, {
  ITreeProps,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";
import "./jqx.base.css";
import "./jqx.fluent.css";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/FilePresent";

class TreeView extends React.PureComponent<{}, ITreeProps> {
  private treeA = React.createRef<JqxTree>();
  private textarea = React.createRef<HTMLTextAreaElement>();

  constructor(props: {}) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.dragStartTreeA = this.dragStartTreeA.bind(this);
    this.dragStartTreeB = this.dragStartTreeB.bind(this);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.dragEndTreeA = this.dragEndTreeA.bind(this);
    this.dragEndTreeB = this.dragEndTreeB.bind(this);
  }

  public render() {
    function rendertree(props, treedata) {
      console.log("props >>>> ", props);

      return (
        <ul
          key={treedata.id}
          onClick={(event) => props.handleSelect(event, treedata.id)}
        >
          {Array.isArray(treedata.children)
            ? treedata.children.map((node) => (
                <li>
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
                  {rendertree(props, node)}
                </li>
              ))
            : null}
        </ul>
      );
    }

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
            ref={this.treeA}
            style={{
              float: "left",
              marginLeft: "0px",
            }}
            onDragStart={this.dragStartTreeA}
            onDragEnd={this.dragEndTreeA}
            dragStart={this.dragStart}
          >
            {rendertree(this.props, this.props.treeData)}
          </JqxTree>
          <div
            style={{
              width: "0px",
              height: "0px",
              float: "left",
              marginLeft: "20px",
            }}
          >
            <textarea ref={this.textarea} rows={5} className="w-0 h-0" />
          </div>
        </div>
      </div>
    );
  }

  // Definitions for the properties-callbacks
  private dragStart(item: any): boolean {
    if (item.label === "Community") {
      return false;
    }

    return true;
  }

  private dragEnd(item: any): boolean {
    if (item.label === "Forum") {
      return false;
    }

    return true;
  }

  // Event handling
  private onDragStart(event: any): void {}

  private onDragEnd(event: any): void {
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
      const rect = this.textarea.current.getBoundingClientRect();
      const width = this.textarea.current.clientWidth;
      const height = this.textarea.current.clientHeight;
      const right = rect.left + width;
      const bottom = rect.top + height;
      if (x >= rect.left && x <= right) {
        if (y >= rect.top && y <= bottom) {
          this.textarea.current!.value = event.args.label;
        }
      }
    }
  }

  private dragStartTreeA(event: Event): void {
    this.onDragStart(event);
  }

  private dragEndTreeA(event: Event): void {
    this.onDragEnd(event);
  }

  private dragStartTreeB(event: Event): void {
    this.onDragStart(event);
  }

  private dragEndTreeB(event: Event): void {
    this.onDragEnd(event);
  }
}

export default TreeView;
