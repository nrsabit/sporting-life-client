import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layouts/Main/Main";
import Home from "../components/Pages/Home/Home/Home";
import Login from "../components/Pages/Login/Login";
import Register from "../components/Pages/Register/Register";
import Instructors from "../components/Pages/Instructors/Instructors";
import Classes from "../components/Pages/Classes/Classes";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/Layouts/Dashboard/Dashboard";
import AdminRoute from "./AdminRoute";
import ManageClasses from "../components/Pages/ManageClasses/ManageClasses";
import ManageUsers from "../components/Pages/ManageUsers/ManageUsers";
import InstructorRoute from "./InstructorRoute";
import MyClasses from "../components/Pages/MyClasses/MyClasses";
import AddClass from "../components/Pages/AddClass/AddClass";
import SelectedClasses from "../components/Pages/SelectedClasses/SelectedClasses";
import EnrolledClasses from "../components/Pages/EnrolledClasses/EnrolledClasses";
import PaymentHistory from "../components/Pages/PaymentHistory/PaymentHistory";
import Payment from "../components/Pages/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin related routes
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },

      // instructor related routes
      {
        path: "my-classes",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "add-class",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },

      // user related routes
      {
        path: "selected-classes",
        element: <SelectedClasses></SelectedClasses>,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses></EnrolledClasses>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
    ],
  },
]);

export default router;
