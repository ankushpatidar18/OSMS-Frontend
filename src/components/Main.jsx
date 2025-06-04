import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./landing_page_components/Hero";
import About from "./landing_page_components/About";
import Admission from "./landing_page_components/Admission";
import Features from "./landing_page_components/Features";
import AppLayout from "./AppLayout";
import AdminDashboard from "./AdminDashboard";
import AdminLoginForm from "./AdminLoginForm";
import UploadStudents from "./UploadStudents";
import SelectClass from "./SelectClass";
import Students from "./Students";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <About />
            <Admission />
            <Features />
          </>
        ),
      },
      {
        path: "/admin/login",
        element: <AdminLoginForm />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
        children: [
          {
            path: "upload-students",
            element: <UploadStudents />,
          },
          {
            path: "select-class",
            element: <SelectClass />,
          },
          {
            path: "students",
            element: <Students />,
          },
        ],
      },
    ],
  },
]);

const Main = () => {
  return <RouterProvider router={appRouter} />;
};

export default Main;
