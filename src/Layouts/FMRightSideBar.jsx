import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  ACTIVE_WORD_COLOR,
  FM_TITLE_COLOR,
  GRAY,
  MEDIUM_GRAY,
} from "../utils/constant";

const FMRightSideBar = () => {
  const { rightSidebarWidth } = useSelector((state) => state.sidebar);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      containerRef.current.style.overflow = "auto";
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.overflow = "hidden";
    }
  };

  const [activeTab, setActiveTab] = useState("details");
  const data = [
    {
      label: "DETAILS",
      value: "details",
    },
    {
      label: "MEMBERS",
      value: "members",
    },
  ];

  return (
    <div
      className={`flex flex-col  px-2 py-0  rightsidebar h-[calc(100vh-160px)] min-w-[200px]`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex justify-center `}
        style={{ minWidth: `${rightSidebarWidth - 30}px` }}
      >
        <Tabs value={activeTab} className={`w-full h-max`}>
          <TabsHeader
            className={`rounded-none border-b border-[${MEDIUM_GRAY}] bg-transparent p-0 h-[60px] `}
            indicatorProps={{
              className: `bg-transparent border-b-[3px] border-[${ACTIVE_WORD_COLOR}] shadow-none rounded-none`,
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={
                  activeTab === value
                    ? `text-[${ACTIVE_WORD_COLOR}] font-medium text-[13px]`
                    : "text-[13px]"
                }
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            <TabPanel key={"details"} value={"details"}>
              <div className="flex flex-col">
                <div className={`text-[${FM_TITLE_COLOR}] text-lg mt-4 mb-4`}>
                  File Details
                </div>
                <div className="flex flex-col gap-4 text-[14px]">
                  <div className="w-full flex justify-between">
                    <div className={`text-[${GRAY}]`}>Uploaded by:</div>
                    <div className={`text-[${FM_TITLE_COLOR}]`}>
                      Serhii Movchan
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <div className={`text-[${GRAY}]`}>Uploaded Date:</div>
                    <div className={`text-[${FM_TITLE_COLOR}]`}>
                      08/24/2019 05:45 PM
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <div className={`text-[${GRAY}]`}>Last Activity</div>
                    <div className={`text-[${FM_TITLE_COLOR}]`}>
                      Today 04:15 PM
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <div className={`text-[${GRAY}]`}>File Size</div>
                    <div className={`text-[${FM_TITLE_COLOR}]`}>3 MB</div>
                  </div>

                  <div className="w-full flex justify-between">
                    <div className={`text-[${GRAY}]`}>File Type</div>
                    <div className={`text-[${FM_TITLE_COLOR}]`}>MP3</div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel key={"members"} value={"members"} className="py-4 px-0">
              <div
                className={`flex w-full justify-between border-b-[${MEDIUM_GRAY}] border-b-[1px] h-[54px] `}
              >
                <div className="flex justify-start items-center ">
                  <img
                    src="/image/avatar4.png"
                    className="w-[40px] h-[40px] rounded-full"
                    alt="avatar"
                  />
                  <div className="flex flex-col ml-2">
                    <div className={`text-[${FM_TITLE_COLOR}] text-[14px]`}>
                      Serhii Movchan
                    </div>
                    <div className={`text-[${GRAY}] text-[14px]`}>Manager</div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <img
                    src="/image/FMDotsIcon.svg"
                    className="w-[24px] h-[24px]"
                    alt="dots"
                  />
                </div>
              </div>
              <div
                className={`flex w-full justify-between border-b-[${MEDIUM_GRAY}] border-b-[1px] h-[54px] `}
              >
                <div className="flex justify-start items-center ">
                  <img
                    src="/image/avatar4.png"
                    className="w-[40px] h-[40px] rounded-full"
                    alt="avatar"
                  />
                  <div className="flex flex-col ml-2">
                    <div className={`text-[${FM_TITLE_COLOR}] text-[14px]`}>
                      Serhii Movchan
                    </div>
                    <div className={`text-[${GRAY}] text-[14px]`}>Manager</div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <img
                    src="/image/FMDotsIcon.svg"
                    className="w-[24px] h-[24px]"
                    alt="dots"
                  />
                </div>
              </div>
              <div
                className={`flex w-full justify-between border-b-[${MEDIUM_GRAY}] border-b-[1px] h-[54px] `}
              >
                <div className="flex justify-start items-center ">
                  <img
                    src="/image/avatar4.png"
                    className="w-[40px] h-[40px] rounded-full"
                    alt="avatar"
                  />
                  <div className="flex flex-col ml-2">
                    <div className={`text-[${FM_TITLE_COLOR}] text-[14px]`}>
                      Serhii Movchan
                    </div>
                    <div className={`text-[${GRAY}] text-[14px]`}>Manager</div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <img
                    src="/image/FMDotsIcon.svg"
                    className="w-[24px] h-[24px]"
                    alt="dots"
                  />
                </div>
              </div>
              <div
                className={`flex w-full justify-between border-b-[${MEDIUM_GRAY}] border-b-[1px] h-[54px] `}
              >
                <div className="flex justify-start items-center ">
                  <img
                    src="/image/avatar4.png"
                    className="w-[40px] h-[40px] rounded-full"
                    alt="avatar"
                  />
                  <div className="flex flex-col ml-2">
                    <div className={`text-[${FM_TITLE_COLOR}] text-[14px]`}>
                      Serhii Movchan
                    </div>
                    <div className={`text-[${GRAY}] text-[14px]`}>Manager</div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <img
                    src="/image/FMDotsIcon.svg"
                    className="w-[24px] h-[24px]"
                    alt="dots"
                  />
                </div>
              </div>
              <div
                className={`flex w-full justify-between border-b-[${MEDIUM_GRAY}] border-b-[1px] h-[54px] `}
              >
                <div className="flex justify-start items-center ">
                  <img
                    src="/image/avatar4.png"
                    className="w-[40px] h-[40px] rounded-full"
                    alt="avatar"
                  />
                  <div className="flex flex-col ml-2">
                    <div className={`text-[${FM_TITLE_COLOR}] text-[14px]`}>
                      Serhii Movchan
                    </div>
                    <div className={`text-[${GRAY}] text-[14px]`}>Manager</div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <img
                    src="/image/FMDotsIcon.svg"
                    className="w-[24px] h-[24px]"
                    alt="dots"
                  />
                </div>
              </div>
              <div
                className={`flex w-full justify-between border-b-[${MEDIUM_GRAY}] border-b-[1px] h-[54px] `}
              >
                <div className="flex justify-start items-center ">
                  <img
                    src="/image/avatar4.png"
                    className="w-[40px] h-[40px] rounded-full"
                    alt="avatar"
                  />
                  <div className="flex flex-col ml-2">
                    <div className={`text-[${FM_TITLE_COLOR}] text-[14px]`}>
                      Serhii Movchan
                    </div>
                    <div className={`text-[${GRAY}] text-[14px]`}>Manager</div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <img
                    src="/image/FMDotsIcon.svg"
                    className="w-[24px] h-[24px]"
                    alt="dots"
                  />
                </div>
              </div>
              <div
                className={`mt-8 text-[${ACTIVE_WORD_COLOR}] underline font-medium`}
              >
                Show All
              </div>
              <div
                className={`mt-6 text-[${FM_TITLE_COLOR}] text-[12px] font-medium `}
              >
                Folder Link
              </div>
              <div className="w-full mt-2 border-[1px] border-[#DEE0E4] py-2 px-4 gap-1 flex items-center ">
                <img
                  src="/image/FMShareIcon.svg"
                  className="w-[18px] h-[18px] "
                  alt="share icon"
                />
                <div className="w-full break-words pr-2">
                  https://www.dv.com/packs/file-folder
                </div>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default FMRightSideBar;
