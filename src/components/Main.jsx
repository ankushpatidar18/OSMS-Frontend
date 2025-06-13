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
import MarksheetGenerator from "./MarksheetGenerator";
import MarkEntryPage from "./MarkEntryPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminChecked, setAdminInfo } from "@/redux/slices/adminSlice";
import RequireAdmin from "./RequireAdmin";
import AddStudentForm from "./AddStudentForm";
import DeleteStudents from "./DeleteStudents";

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
        element: (
          <RequireAdmin>
        <AdminDashboard />
        </RequireAdmin>),
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
          {
            path: "marksheet",
            element: <MarksheetGenerator />,
          },
          {
            path:"mark-entry",
            element: <MarkEntryPage/>
          },{
            path: "add-student",
            element: <AddStudentForm />,
          },
          {
            path: "delete-student",
            element: <DeleteStudents />, 
          }
        ],
      },
    ],
  },
]);

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  fetch("http://localhost:5000/api/admin/me", {
    credentials: "include",
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data && data.admin) {
        dispatch(setAdminInfo(data.admin));
      } else {
        dispatch(setAdminChecked(true)); 
      }
    })
    .catch(() => {
      dispatch(setAdminChecked(true));
    });
}, [dispatch]);

  return <RouterProvider router={appRouter} />;
};

export default Main;
