import { useNavigate, useLocation } from "react-router-dom";

// material
import {
  Navbar,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import SearchBox from "../Components/FMSearchBox";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isTablet, setIsTablet] = useState(false);

  const data = [
    {
      label: "ALL",
      value: "all",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "TASKS",
      value: "tasks",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "PAYMENTS",
      value: "payments",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "UPLOADING",
      value: "uploading",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  const navigate = useNavigate();

  const currentUrl = useLocation().pathname;

  const menus = [
    {
      title: "Media",
      path: "/filemanage",
      key: ["/filemanage", "/filemanage/mines", "/filemanage/upload"],
      children: [
        {
          title: "My Files",
          path: "/mines",
        },
        {
          title: "Upload File",
          path: "/upload",
        },
      ],
    },
    {
      title: "Transcripts",
      path: "/transcripts",
      key: ["/transcripts", "/transcripts/tasklist", "/transcripts/editor"],
      children: [
        {
          title: "List of Tasks",
          path: "/tasklist",
        },
        {
          title: "Editor",
          path: "/editor",
        },
      ],
    },
    {
      title: "Users",
      path: "/users",
      key: ["/user", "/users/clients", "/users/myteam"],
      children: [
        {
          title: "Clients",
          path: "/clients",
        },
        {
          title: "My Team",
          path: "/myteam",
        },
      ],
    },
  ];

  useEffect(() => {
    if (window && window.innerWidth <= 800) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }

    window.addEventListener("resize", () => {
      if (window) {
        if (window.innerWidth <= 800) {
          setIsTablet(true);
        } else {
          setIsTablet(false);
        }
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <Navbar className="top-0 z-50 rounded-none fixed bg-white bg-opacity-100 border-white border-opacity-100 backdrop-saturate-0 backdrop-blur-none">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Typography
            className="flex cursor-pointer font-bold text-custom-black text-xl items-center"
            style={{ marginRight: `${isTablet ? "mr-2" : "mr-16"} ` }}
            onClick={() => navigate("/")}
          >
            <img
              src="/image/favicon.png"
              alt="Transcribatron.png"
              className=" mr-2 w-[26px] h-[30px]"
            />
          </Typography>
          {isTablet === false ? (
            <ul className="flex flex-row gap-6">
              {menus.map((menu) => {
                return (
                  <li
                    key={menu.path}
                    className={`cursor-pointer ${
                      menu.key.includes(currentUrl)
                        ? "text-custom-sky"
                        : "text-custom-black"
                    }`}
                  >
                    <Menu allowHover>
                      {Object.keys(menu)?.includes("children") ? (
                        <>
                          <MenuHandler>
                            <span
                              onClick={() =>
                                menu.children.length > 0
                                  ? navigate("#")
                                  : navigate(menu.path)
                              }
                              className={`cursor-pointer ${
                                menu.key.includes(currentUrl)
                                  ? "text-custom-sky"
                                  : "text-custom-black"
                              }`}
                            >
                              {menu.title}
                            </span>
                          </MenuHandler>
                          <MenuList>
                            {menu.children.map((child) => {
                              return (
                                <MenuItem key={child.path}>
                                  <span
                                    className={
                                      menu.path + child.path == currentUrl
                                        ? "text-custom-sky"
                                        : "text-custom-black"
                                    }
                                    onClick={() =>
                                      navigate(menu.path + child.path)
                                    }
                                  >
                                    {child.title}
                                  </span>
                                </MenuItem>
                              );
                            })}
                          </MenuList>
                        </>
                      ) : (
                        <>
                          <span
                            className={`cursor-pointer ${
                              menu.key.includes(currentUrl)
                                ? "text-custom-sky"
                                : "text-custom-black"
                            }`}
                            onClick={() => navigate(menu.path)}
                          >
                            {menu.title}
                          </span>
                        </>
                      )}
                    </Menu>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              className="relative w-[50px] h-[50px] rounded-[8px] bg-[#E9F0FD] border-[2px] border-[#E9F0FD] flex justify-center items-center cursor-pointer"
              onClick={() => setShowNavMenu(!showNavMenu)}
            >
              <img
                src="/image/MobilemenuIcon.svg"
                className="w-6 h-6 "
                alt="menu icon"
              />
              {showNavMenu === true && (
                <ul className="flex flex-row gap-6 absolute z-40 left-10 top-10 bg-white px-5 py-5 border-[1px] border-[#E5E9EE] rounded-[4px] shadow-md">
                  {menus.map((menu) => {
                    return (
                      <li
                        key={menu.path}
                        className={`cursor-pointer ${
                          menu.key.includes(currentUrl)
                            ? "text-custom-sky"
                            : "text-custom-black"
                        }`}
                      >
                        <Menu allowHover>
                          {Object.keys(menu)?.includes("children") ? (
                            <>
                              <MenuHandler>
                                <span
                                  onClick={() => {
                                    setShowNavMenu(!showNavMenu);
                                    menu.children.length > 0
                                      ? navigate("#")
                                      : navigate(menu.path);
                                  }}
                                  className={`cursor-pointer ${
                                    menu.key.includes(currentUrl)
                                      ? "text-custom-sky"
                                      : "text-custom-black"
                                  }`}
                                >
                                  {menu.title}
                                </span>
                              </MenuHandler>
                              <MenuList>
                                {menu.children.map((child) => {
                                  return (
                                    <MenuItem key={child.path}>
                                      <span
                                        className={
                                          menu.path + child.path == currentUrl
                                            ? "text-custom-sky"
                                            : "text-custom-black"
                                        }
                                        onClick={() => {
                                          setShowNavMenu(!showNavMenu);
                                          navigate(menu.path + child.path);
                                        }}
                                      >
                                        {child.title}
                                      </span>
                                    </MenuItem>
                                  );
                                })}
                              </MenuList>
                            </>
                          ) : (
                            <>
                              <span
                                className={`cursor-pointer ${
                                  menu.key.includes(currentUrl)
                                    ? "text-custom-sky"
                                    : "text-custom-black"
                                }`}
                                onClick={() => {
                                  showNavMenu(false);
                                  navigate(menu.path);
                                }}
                              >
                                {menu.title}
                              </span>
                            </>
                          )}
                        </Menu>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="w-full md:w-calc-full-without-250  md:max-w-[450px] flex items-end ">
          <SearchBox className={`w-full bg-[#F2F3F5] h-[50px] `} />
        </div>
        <div className="flex items-center">
          <div className="relative">
            <img
              src="/image/FMNotificationIcon.svg"
              className="w-12 h-12 mr-4 cursor-pointer"
              alt="notification icon"
              onClick={() => setShowNotificationPopup(!showNotificationPopup)}
            />
            {showNotificationPopup === true && (
              <div
                className="w-[480px] absolute z-30 right-0 top-12 flex flex-col gap-3 bg-white shadow-md
              border-[1px] border-[#E5E9EE] rounded-[4px]
              "
              >
                <Tabs value={activeTab} className="w-full min-h-[300px]">
                  <TabsHeader
                    className="rounded-none border-b border-[#C4C4C4] bg-transparent p-0 h-[54px] "
                    indicatorProps={{
                      className:
                        "bg-transparent border-b-[3px] border-[#4489FE] shadow-none rounded-none ",
                    }}
                  >
                    {data.map(({ label, value }) => (
                      <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={
                          activeTab === value
                            ? "text-[#4489FE] font-medium text-[11px]"
                            : " text-[11px]"
                        }
                      >
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody>
                    <TabPanel key={"all"} value={"all"}>
                      <div className="flex flex-col gap-5">
                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#0FAA5828] rounded-[2px] text-[#0FAA58] text-[11px] text-center ">
                              Payments
                            </div>
                            <div className="flex flex-col ml-3">
                              <div className="text-[#212121] text-[13px]">
                                Paymetns #1231423
                              </div>
                              <div className="text-[#757575] text-[13px]">
                                You have new payment
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>

                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#E9F0FD] rounded-[2px] text-[#4489FE] text-[11px] text-center ">
                              Tasks
                            </div>
                            <div className="flex flex-col ml-3">
                              <div className="text-[#212121] text-[13px]">
                                New notification page
                              </div>
                              <div className="text-[#757575] text-[13px]">
                                You have new comments in task{" "}
                                <span className="text-[#4489FE]">#2424525</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>
                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#E9F0FD] rounded-[2px] text-[#4489FE] text-[11px] text-center ">
                              Tasks
                            </div>
                            <div className="flex flex-col ml-3">
                              <div className="text-[#212121] text-[13px]">
                                New notification page
                              </div>
                              <div className="text-[#757575] text-[13px]">
                                You have new comments in task{" "}
                                <span className="text-[#4489FE]">#2424526</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>
                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#F1F3F4] text-[#757575] text-[11px] text-center ">
                              Uploading
                            </div>
                            <div className="flex flex-col ml-3">
                              <div className="text-[#212121] text-[13px]">
                                example.mp3
                              </div>
                              <div className="text-[#757575] text-[13px]">
                                Upload complete
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>

                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#F1F3F4] text-[#757575] text-[11px] text-center ">
                              Uploading
                            </div>
                            <div className="flex flex-col ml-3 gap-2">
                              <div className="text-[#212121] text-[13px]">
                                example.mp3
                              </div>
                              <div className="text-[#757575] text-[13px] relative">
                                <div className="w-[200px] bg-[#F2F1F1] h-[8px] rounded-[3px]" />
                                <div className="w-[140px] bg-[#4489FE] h-[6px] rounded-[3px] absolute top-[1px] left-0" />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel key={"tasks"} value={"tasks"}>
                      <div className="flex flex-col gap-5">
                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#E9F0FD] rounded-[2px] text-[#4489FE] text-[11px] text-center ">
                              Tasks
                            </div>
                            <div className="flex flex-col ml-3">
                              <div className="text-[#212121] text-[13px]">
                                New notification page
                              </div>
                              <div className="text-[#757575] text-[13px]">
                                You have new comments in task{" "}
                                <span className="text-[#4489FE]">#2424525</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>
                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#E9F0FD] rounded-[2px] text-[#4489FE] text-[11px] text-center ">
                              Tasks
                            </div>
                            <div className="flex flex-col ml-3">
                              <div className="text-[#212121] text-[13px]">
                                New notification page
                              </div>
                              <div className="text-[#757575] text-[13px]">
                                You have new comments in task{" "}
                                <span className="text-[#4489FE]">#2424526</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel key={"payments"} value={"payments"} className="">
                      <div className="flex flex-col gap-5">
                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#0FAA5828] rounded-[2px] text-[#0FAA58] text-[11px] text-center ">
                              Payments
                            </div>
                            <div className="flex flex-col ml-3 ">
                              <div className="text-[#212121] text-[13px]">
                                Paymetns #1231423
                              </div>
                              <div className="text-[#757575] text-[13px]">
                                You have new payment
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel
                      key={"uploading"}
                      value={"uploading"}
                      className=""
                    >
                      <div className="flex flex-col gap-5">
                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#F1F3F4] rounded-[2px] text-[#757575] text-[11px] text-center ">
                              Uploading
                            </div>
                            <div className="flex flex-col ml-3 ">
                              <div className="text-[#212121] text-[13px]">
                                example.mp3
                              </div>
                              <div className="text-[#757575] text-[13px]">
                                Upload complete
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>

                        <div className="flex w-full px-5 justify-between items-center">
                          <div className="flex justify-start items-center">
                            <div className="w-[62px] h-[19px] bg-[#F1F3F4]  rounded-[2px] text-[#757575] text-[11px] text-center ">
                              Uploading
                            </div>
                            <div className="flex flex-col ml-3 gap-2">
                              <div className="text-[#212121] text-[13px]">
                                example.mp3
                              </div>
                              <div className="text-[#757575] text-[13px] relative">
                                <div className="w-[200px] bg-[#F2F1F1] h-[8px] rounded-[3px]" />
                                <div className="w-[140px] bg-[#4489FE] h-[6px] rounded-[3px] absolute top-[1px] left-0" />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-center text-[11px] text-[#757575]">
                            Yesterday at 6:56 PM
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </TabsBody>
                </Tabs>
                <div className="text-[#4489FE] underline text-[13px] text-center flex w-full justify-center py-10 ">
                  View all notification
                </div>
              </div>
            )}
          </div>
          <Menu>
            <MenuHandler>
              <Avatar
                variant="circular"
                alt="tania andrew"
                className="cursor-pointer"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
            </MenuHandler>
            <MenuList>
              <div className="flex outline-0 cursor-pointer">
                <hr className="my-2 border-blue-gray-50 w-1/3" />
                <p className=" w-1/3 text-center text-custom">Account</p>
                <hr className="my-2  w-1/3 border-blue-gray-50" />
              </div>
              <MenuItem className="flex gap-2">
                <Typography variant="small" className="font-normal">
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem className="flex gap-2">
                <Typography variant="small" className="font-normal">
                  Password
                </Typography>
              </MenuItem>
              <MenuItem className="flex gap-2">
                <Typography variant="small" className="font-normal">
                  Settings
                </Typography>
              </MenuItem>
              <div className="flex outline-0 cursor-pointer">
                <hr className="my-2 border-blue-gray-50 w-1/3" />
                <p className=" w-1/3 text-center">Billing</p>
                <hr className="my-2  w-1/3 border-blue-gray-50" />
              </div>
              <MenuItem className="flex gap-2">
                <Typography variant="small" className="font-normal">
                  Payment Methods
                </Typography>
              </MenuItem>
              <MenuItem className="flex gap-2">
                <Typography variant="small" className="font-normal">
                  Transaction History
                </Typography>
              </MenuItem>
              <div className="flex outline-0 cursor-pointer">
                <hr className="my-2 border-blue-gray-50 w-1/3" />
                <p className=" w-1/3 text-center">Support</p>
                <hr className="my-2  w-1/3 border-blue-gray-50" />
              </div>
              <MenuItem className="flex gap-2">
                <Typography variant="small" className="font-normal">
                  Knowledge Base
                </Typography>
              </MenuItem>
              <MenuItem className="flex gap-2">
                <Typography variant="small" className="font-normal">
                  Contact Support
                </Typography>
              </MenuItem>
              <div className="flex outline-0 cursor-pointer">
                <hr className="my-2 border-blue-gray-50 w-full" />
              </div>
              <MenuItem className="flex gap-2 ">
                <Typography variant="small" className="font-normal">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}
