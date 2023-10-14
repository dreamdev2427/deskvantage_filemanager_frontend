import { useCallback, useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import TextFileIcon from "@mui/icons-material/TextFields";
import ZipFileIcon from "@mui/icons-material/FolderZip";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import Popup from "@mui/material/Popover";
import { AiOutlineDownload } from "react-icons/ai";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineContentCopy,
} from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { LuStickyNote } from "react-icons/lu";
import { RiUserSharedLine } from "react-icons/ri";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { GrCircleInformation } from "react-icons/gr";
import { TfiTrash } from "react-icons/tfi";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import { LinearProgress } from "@mui/material";
import FMTreeSideBar from "./FMTreeSideBar";
import { useDropzone } from "react-dropzone";

const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const extensionsArray = ["txt", "pdf", "png", "mp3", "mp4", "zip"];
const wordList = ["apple", "banana", "cat", "dog", "elephant", "fox", "grape"];

function getFileExtension(fileName) {
  // Split the fileName by dot (.)
  const parts = fileName.split(".");

  // Check if there's at least one dot in the fileName
  if (parts.length > 1) {
    // Return the last part as the file extension (convert to lowercase for consistency)
    return parts[parts.length - 1].toLowerCase();
  } else {
    // If there's no dot, it's an unknown or extension-less file
    return null;
  }
}

function generateRandomFileName(extensions, length = 2) {
  if (!Array.isArray(extensions) || extensions.length === 0) {
    throw new Error("Extensions array must be provided and not empty.");
  }

  if (!Array.isArray(wordList) || wordList.length === 0) {
    throw new Error("Word list array must be provided and not empty.");
  }

  const randomExtension =
    extensions[Math.floor(Math.random() * extensions.length)];
  let randomFileName = "";

  for (let i = 0; i < length; i++) {
    const randomWordIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomWordIndex];
    randomFileName += randomWord;
  }

  return `${randomFileName}.${randomExtension}`;
}

const generateRandomDate = () => {
  const startDate = new Date(2000, 0, 1).getTime(); // Adjust the start date as needed
  const endDate = new Date().getTime(); // Use the current date as the end date

  const randomTime = startDate + Math.random() * (endDate - startDate);
  return new Date(randomTime);
};

function parseFileSize(fileSizeString) {
  const sizeParts = fileSizeString.trim().split(" ");
  if (sizeParts.length !== 2) {
    throw new Error("Invalid file size format.");
  }

  const size = parseFloat(sizeParts[0]);
  const unit = sizeParts[1].toUpperCase();

  switch (unit) {
    case "B":
      return size;
    case "KB":
      return size * 1024;
    case "MB":
      return size * 1024 * 1024;
    case "GB":
      return size * 1024 * 1024 * 1024;
    case "TB":
      return size * 1024 * 1024 * 1024 * 1024;
    default:
      throw new Error("Unsupported unit in file size.");
  }
}

function formatFileSize(fileSizeInBytes) {
  const units = ["B", "kB", "MB", "GB", "TB"];
  let size = fileSizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size?.toFixed(2)} ${units[unitIndex]}`;
}

let rows = [];

const fillRows = () => {
  for (let index = 0; index < 25; index++) {
    rows[index] = {
      id: index + 1,
      FileName: generateRandomFileName(extensionsArray),
      LastUpdated: generateRandomDate(),
      Size: Math.floor(Math.random() * 10995116277760),
      PlayLength: generateRandomDate(),
      uploadProgress: 100,
    };
  }
};

fillRows();

function NameCell(params) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [openMoveToModal, setOpenMoveToModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [noteString, setNoteString] = useState("");
  const maxLengthOfNote = 4000;

  const hidePresentation = (event) => {
    if (
      document
        .elementFromPoint(event.clientX, event.clientY)
        .outerHTML.toString()
        .includes("/image/FMDotsIcon.svg") === true
    ) {
      document
        .elementFromPoint(event.clientX, event.clientY)
        .parentElement.click();
    }
  };
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setOpen(false);
    setTimeout(hidePresentation, 400, event);
  };

  const handleClickNoteMenu = (event) => {
    setOpen(false);
    setOpenNoteModal(true);
  };

  const handleCloseNoteModal = () => {
    setOpenNoteModal(false);
  };

  const handleClickMoveToMenu = (event) => {
    setOpen(false);
    setOpenMoveToModal(true);
  };

  const handleCloseMoveToModal = () => {
    setOpenMoveToModal(false);
  };

  const handleClickTagMenu = (event) => {
    event.preventDefault();
    setOpen(false);
    setOpenTagModal(true);
  };

  const handleCloseTagModal = () => {
    setOpenTagModal(false);
  };

  return (
    <div>
      <button onClick={handleClick} className=" w-max">
        <img src="/image/FMDotsIcon.svg" className="w-5 h-5" alt="dots" />
      </button>
      <Popup
        id={`parentMenu_${params.id}`}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="flex flex-col gap-1 text-sm font-medium">
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214]"
            id={`download_${params.id}`}
          >
            <AiOutlineDownload />
            Download
          </div>
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214]"
            id={`rename_${params.id}`}
          >
            <MdOutlineDriveFileRenameOutline />
            Rename
          </div>
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214]"
            id={`tagMenu_${params.id}`}
            onClick={(e) => handleClickTagMenu(e)}
          >
            <BiPurchaseTagAlt />
            <div className="" id={`tagButton_${params.id}`}>
              Tag
            </div>
          </div>
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214] border-b-[1px] border-[#DEE0E4] "
            id={`copy_${params.id}`}
          >
            <MdOutlineContentCopy />
            Copy
          </div>
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214]"
            id={`addNote_${params.id}`}
            onClick={(e) => handleClickNoteMenu(e)}
          >
            <LuStickyNote />
            Add Note
          </div>
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214]"
            id={`share_${params.id}`}
          >
            <RiUserSharedLine />
            Share
          </div>
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214]"
            id={`move_${params.id}`}
            onClick={(e) => handleClickMoveToMenu(e)}
          >
            <MdDriveFileMoveOutline />
            Move
          </div>
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214] border-b-[1px] border-[#DEE0E4] "
            id={`fileInfo_${params.id}`}
          >
            <GrCircleInformation />
            File information
          </div>
          <div
            className="flex items-center px-5 py-1 gap-2 hover:bg-[#1976d214] "
            id={`delete_${params.id}`}
          >
            <TfiTrash />
            Delete
          </div>
        </div>
      </Popup>
      <Modal
        id={`notePopup_${params.id}`}
        open={openNoteModal}
        onClose={handleCloseNoteModal}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[350px] h-[250px] bg-white shadow-lg rounded-lg flex flex-col items-center">
            <div
              className="w-full px-10 mt-5 text-lg font-medium flex gap-2 border-b-[1px] border-[#DEE0E4]
              items-center
            "
            >
              <LuStickyNote />
              <div className="">Add Note</div>
            </div>
            <textarea
              maxLength={maxLengthOfNote}
              type="text"
              className="w-9/12 mt-5 p-1 h-full border-black rounded-md border-[1px]"
              value={noteString}
              onChange={(e) => setNoteString(e.target.value)}
            ></textarea>
            <div className="flex w-9/12 justify-between mt-2 mb-5">
              <div className="">
                {noteString?.length}/{maxLengthOfNote}
              </div>
              <button
                className="bg-[#4489FE] w-max py-2 px-3 text-sm font-medium rounded-2xl text-white "
                onClick={() => handleCloseNoteModal()}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        id={`move2Popup_${params.id}`}
        open={openMoveToModal}
        onClose={handleCloseMoveToModal}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[700px] h-[500px] bg-white shadow-lg rounded-lg flex flex-col items-center">
            <div
              className="w-full px-10 mt-5 text-lg font-medium flex gap-2 border-b-[1px] border-[#DEE0E4]
              items-center
            "
            >
              <MdDriveFileMoveOutline />
              <div className="">Move To</div>
            </div>
            <div className="w-full h-full overflow-auto">
              <FMTreeSideBar />
            </div>
            <div className="flex w-9/12 justify-start mt-2 mb-5 gap-2">
              <button
                className="bg-[#4489FE] w-max py-2 px-3 text-sm font-medium rounded-2xl text-white "
                onClick={() => handleCloseMoveToModal()}
              >
                Save
              </button>
              <button
                className="bg-[#4489FE] w-max py-2 px-3 text-sm font-medium rounded-2xl text-white "
                onClick={() => handleCloseMoveToModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        id={`tagPopup_${params.id}`}
        open={openTagModal}
        onClose={handleCloseTagModal}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[350px] h-[250px] bg-white shadow-lg rounded-lg flex flex-col items-center">
            <div
              className="w-full px-10 mt-5 text-lg font-medium flex gap-2 border-b-[1px] border-[#DEE0E4]
              items-center
            "
            >
              <BiPurchaseTagAlt />
              <div className="">Add Tag</div>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
            <div className="flex w-9/12 justify-start mt-2 mb-5 gap-2">
              <button
                className="bg-[#4489FE] w-max py-2 px-3 text-sm font-medium rounded-2xl text-white "
                onClick={() => handleCloseTagModal()}
              >
                Save
              </button>
              <button
                className="bg-[#4489FE] w-max py-2 px-3 text-sm font-medium rounded-2xl text-white "
                onClick={() => handleCloseTagModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const FMMiddlePanel = () => {
  const [uploadingRowIds, setUploadingRowIds] = useState([]);
  const apiRef = useRef(null);
  const divOfTableRef = useRef(null);
  const [divWidth, setDivWidth] = useState(1000);
  const [tableRows, setTableRows] = useState(rows);
  const { leftSidebarWidth, rightSidebarWidth } = useSelector(
    (state) => state.sidebar
  );
  // create a map for storing the XMLHttpRequest objects for each file upload
  const xhrMap = useRef(new Map());
  const [isDragActive, setIsDragActive] = useState(false);

  // define a function that will cancel the upload and delete the row
  const cancelUpload = (id) => {
    // get the XMLHttpRequest object from the map
    const xhr = xhrMap.current.get(id);
    // abort the request
    xhr.abort();
    // delete the row from the data grid using the API
    apiRef.current.updateRows([{ id, _action: "delete" }]);
  };

  // define a callback function that will handle the dropped files
  const onDrop = useCallback((files) => {
    // do something with the files
    // loop through each file
    for (let i = 0; i < files.length; i++) {
      // get the file name and size
      const fileName = files[i].name;
      const fileSize = files[i].size;

      // generate a random id for the new row
      const id = Math.floor(Math.random() * 100000);
      setUploadingRowIds(
        uploadingRowIds?.includes(id) === true
          ? uploadingRowIds
          : [...uploadingRowIds, id]
      );
      // create a new row object with the file name, size, and upload progress
      const newRow = {
        id: id,
        FileName: fileName,
        LastUpdated: new Date(),
        Size: fileSize,
        PlayLength: generateRandomDate(),
        uploadProgress: 0,
      };

      const xhr = new XMLHttpRequest();
      if (apiRef.current) {
        // add the new row to the data grid using the API
        setTableRows((prevRows) => [newRow, ...prevRows]);
        apiRef.current.updateRows([newRow]);

        // create a new XMLHttpRequest object
        // open a POST request to the server endpoint that handles the file upload
        xhr.open("POST", "/upload");
        // add a load event listener to the XMLHttpRequest object
        xhr.addEventListener("load", function () {
          // handle the response from the server
          console.log(xhr.responseText);
        });
        // add an error event listener to the XMLHttpRequest object
        xhr.addEventListener("error", function () {
          // handle the error from the server
          console.log(xhr.statusText);
        });
        // add a progress event listener to the upload property of the XMLHttpRequest object
        xhr.upload.addEventListener("progress", function (event) {
          // check if the event has length information
          if (event.lengthComputable) {
            // calculate the percentage of upload completed
            const percent = Math.round((event.loaded / event.total) * 100);
            // update the upload progress value using the API
            apiRef.current.updateRows([{ id, uploadProgress: percent }]);
            if (event.loaded >= event.total) {
              setIsDragActive(false);
            }
          }
        });

        // send the file as FormData
        // const formData = new FormData();
        // formData.append("file", files[i]);
        // xhr.send(formData);

        // store the XMLHttpRequest object in the map
        xhrMap.current.set(id, xhr);

        setTimeout(() => {
          if (apiRef.current) {
            apiRef.current.updateRows([{ id, uploadProgress: 100 }]);
            setIsDragActive(false);
          }
        }, 3000);
      }
    }
  }, []);

  // get the props and methods from the hook
  const { getRootProps } = useDropzone({
    onDrop,
    noClick: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const columns = [
    {
      field: "FileName",
      headerName: "File Name",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        const fileExtension = getFileExtension(params.value); // Get the corresponding icon based on the extension

        return (
          <div className="flex gap-2 ">
            {fileExtension === "png" ? (
              <ImageIcon sx={{ fill: "#4489fe" }} />
            ) : fileExtension === "zip" ? (
              <ZipFileIcon sx={{ fill: "#4489fe" }} />
            ) : fileExtension === "pdf" || fileExtension === "txt" ? (
              <TextFileIcon sx={{ fill: "#4489fe" }} />
            ) : fileExtension === "mp3" ? (
              <AudioFileIcon sx={{ fill: "#4489fe" }} />
            ) : fileExtension === "mp4" ? (
              <VideoFileIcon sx={{ fill: "#4489fe" }} />
            ) : (
              <></>
            )}
            <div className="">{params.value}</div>
          </div>
        );
      },
    },
    {
      field: "PlayLength",
      headerName: "Length",
      description: "This column shows play time length of file.",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => {
        // Convert Date to "hh:mm:ss" string format
        const date = new Date(params.row.PlayLength);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      },
    },
    {
      field: "LastUpdated",
      headerName: "Last Updated",
      type: Date,
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => {
        // Convert Date to a readable string (e.g., "October 10, 2023")
        return `${months[new Date(params.row.LastUpdated).getMonth() + 1]} ${
          new Date(params.row.LastUpdated).getDay() + 1
        }, ${new Date(params.row.LastUpdated).getFullYear()}`;
      },
      sortComparator: (v1, v2, param1, param2) => {
        // Custom sorting function for "Last updated" column
        return (
          new Date(param1.value).getTime() - new Date(param2.value).getTime()
        );
      },
      renderCell: (params) => {
        // return a JSX element that renders inside the cell
        return (
          <>
            {uploadingRowIds.includes(params.id) === true ? (
              <div className="w-full flex gap-2 items-center">
                <span>{params.row.uploadProgress}%</span>
                {params.row.uploadProgress < 100 && (
                  <AiOutlineClose
                    className="w-6 h-6"
                    onClick={() => cancelUpload(params.id)}
                  />
                )}
                <LinearProgress
                  sx={{
                    width: "100%",
                    height: "2px",
                    borderRadius: "14px",
                    paddingLeft: "5px",
                  }}
                  variant="determinate"
                  value={params.row.uploadProgress}
                />
              </div>
            ) : (
              <>{params.value}</>
            )}
          </>
        );
      },
    },
    {
      field: "Size",
      headerName: "Size",
      flex: 1,
      valueGetter: (params) => {
        // Convert the numeric file size to a human-readable format
        const fileSize = params.row.Size;
        return formatFileSize(fileSize);
      },
      sortComparator: (v1, v2, param1, param2) => {
        return parseFileSize(param1.value) - parseFileSize(param2.value);
      },
      renderCell: (params) => {
        return (
          <div className="flex justify-between min-w-[150px] pr-[18px]">
            <div className="">{params.value}</div>

            <NameCell {...params} />
          </div>
        );
      },
    },
  ];

  // Function to update the div width when the screen is resized
  const updateDivWidth = () => {
    if (divOfTableRef.current) {
      const width = divOfTableRef.current.offsetWidth;

      setDivWidth(Number(width));
    }
  };

  // Attach an event listener to the window's resize event
  useEffect(() => {
    window.addEventListener("resize", updateDivWidth);

    // Call the function initially to get the initial width
    updateDivWidth();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateDivWidth);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", function (e) {
      if (!divOfTableRef.current) return;

      updateDivWidth();
    });

    return () => {
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div className="w-full flex flex-col ">
      <div
        className={`      
        flex justify-between items-center h-[60px] border-b border-b-[#dee0e4] fixed bg-white z-10 fill-white `}
        style={{
          width: `calc(100% - ${
            Number(leftSidebarWidth) + Number(rightSidebarWidth)
          }px)`,
        }}
        ref={divOfTableRef}
      >
        <div className="flex  justify-start ml-4 text-[14px] min-w-[400px] select-none ">
          <div className="flex border-r-[2px] border-[#dee0e4] gap-2 px-4 cursor-pointer">
            <img
              src="/image/FMShareIcon.svg"
              className="w-[20px] h-[20px] cursor-pointer"
              alt="icon"
            />
            Create link
          </div>
          <div className="flex border-r-[2px] border-[#dee0e4] gap-2 px-4 cursor-pointer">
            <img
              src="/image/FMEyeIcon.svg"
              className="w-[20px] h-[20px] cursor-pointer"
              alt="icon"
            />
            View selected
          </div>
          {divWidth <= 730 ? (
            <></>
          ) : (
            <>
              <div className=" border-r-[2px] border-[#dee0e4] gap-2 px-4 cursor-pointer flex ">
                <img
                  src="/image/FMEyeIcon.svg"
                  className="w-[20px] h-[20px] cursor-pointer"
                  alt="icon"
                />
                Zip
              </div>

              <div className=" border-r-[2px] border-[#dee0e4] gap-2 px-4 cursor-pointer  flex">
                <img
                  src="/image/FMCopyIcon.svg"
                  className="w-[19px] h-[19px] cursor-pointer"
                  alt="icon"
                />
                Copy
              </div>
              <div className=" border-r-[2px] border-[#dee0e4] gap-2 px-4 cursor-pointer flex">
                <img
                  src="/image/FMDownloadIcon.svg"
                  className="w-[20px] h-[20px] cursor-pointer"
                  alt="icon"
                />
                Download
              </div>
            </>
          )}
          <div className="flex  gap-2 px-4 cursor-pointer">
            <img
              src="/image/FMDotsIcon.svg"
              className="w-[20px] h-[20px] "
              alt="icon"
            />
            More
            {/* <img
              src="/image/FMStarIcon.svg"
              className="w-[20px] h-[20px] cursor-pointer"
              alt="icon"
            />
            <img
              src="/image/FMEditIcon.svg"
              className="w-[20px] h-[20px] cursor-pointer"
              alt="icon"
            />
            <img
              src="/image/FMTrashIcon.svg"
              className="w-[20px] h-[20px] cursor-pointer"
              alt="icon"
            /> */}
          </div>
        </div>
        <div className=" text-sm font-medium mr-4">
          {/* {selectedRows?.length} items selected */}
        </div>
      </div>
      <div
        className={`w-full px-4 flex justify-center  font-roboto mt-[60px]  ${
          isDragActive ? "bg-gray-200" : "white"
        }`}
        {...getRootProps()}
      >
        <DataGrid
          rows={tableRows}
          columns={columns}
          checkboxSelection={true}
          rowSelection={true}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(rowSelectionModel, details) => {
            setSelectedRows(rowSelectionModel);
          }}
          apiRef={apiRef}
          sx={{
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
            backgroundColor: "transparent",
          }}
          components={{
            ColumnSortedAscendingIcon: () => (
              <img
                src={"/image/down.png"}
                className="w-4 h-4"
                alt="Ascending"
              />
            ),
            ColumnSortedDescendingIcon: () => (
              <img src={"/image/up.png"} className="w-4 h-4" alt="Descending" />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default FMMiddlePanel;
