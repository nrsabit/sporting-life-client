import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layouts/Main/Main";
import Home from "../components/Pages/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
