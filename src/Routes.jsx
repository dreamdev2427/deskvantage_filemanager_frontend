// layouts
import MainLyt from "./Layouts";

// pages
import Error404 from "./pages/Error/404";
import FileManager from "./pages/FileManager";
import Home from "./pages/Home";

// define routes
const Routes = [
  {
    path: "/",
    element: <MainLyt />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/filemanage",
    element: <FileManager />,
  },
  {
    path: "/filemanage/mines",
    element: <FileManager />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default Routes;
