import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, setUserChecked } from "@/redux/slices/userSlice";
import axios from "axios";


import Hero from "./landing_page_components/Hero";
import About from "./landing_page_components/About";
import Admission from "./landing_page_components/Admission";
import Features from "./landing_page_components/Features";
import LoginForm from "./LoginForm";
import AppErrorBoundary from "./AppErrorBoundary";
import NotFoundPage from "./NotFoundPage";
import TeacherDashboard from "./TeacherDashboard";


// Lazy loaded components
const AppLayout = lazy(() => import("./AppLayout"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const UploadStudents = lazy(() => import("./UploadStudents"));
const Students = lazy(() => import("./Students"));
const MarksheetGenerator = lazy(() => import("./MarksheetGenerator"));
const MarkEntryPage = lazy(() => import("./MarkEntryPage"));
const RequireRole = lazy(() => import("./RequireRole"));
const AddStudentForm = lazy(() => import("./AddStudentForm"));
const DeleteStudents = lazy(() => import("./DeleteStudents"));
const MarksEntryMatrix = lazy(() => import("./MarkEntryMatrix"));
const ExamScheduleManager = lazy(() => import("./ExamScheduleManager"));
const AdmitCardGenerator = lazy(() => import("./AdmitCardGenerator"));
const PromoteStudents = lazy(() => import("./PromoteStudents"));

const ApiUrl = import.meta.env.VITE_BASE_URL;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
       
      <Suspense fallback={<div>Loading layout...</div>}>
        <AppLayout />
      </Suspense>
      
    ),
    children: [
      {
        index: true,
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
        path: "/login",
        element: <LoginForm />, // Eagerly loaded
      },
      {
        path: "/admin/dashboard",
        element: (
          <Suspense fallback={<div>Loading dashboard...</div>}>
            <RequireRole allowedRoles={["admin"]}>
              <AdminDashboard />
            </RequireRole>
          </Suspense>
        ),
        children: [
          {
            path: "upload-students",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading upload students...</div>}>
                <UploadStudents />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "admit-card",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading admit card generator...</div>}>
                <AdmitCardGenerator />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "students",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading students...</div>}>
                <Students />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "marksheet",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading marksheet generator...</div>}>
                <MarksheetGenerator />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "mark-entry",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading mark entry...</div>}>
                <MarkEntryPage />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "add-student",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading add student form...</div>}>
                <AddStudentForm />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "delete-student",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading delete students...</div>}>
                <DeleteStudents />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "mark-entry-matrix",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading mark entry matrix...</div>}>
                <MarksEntryMatrix />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "exam-schedule",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading exam schedule manager...</div>}>
                <ExamScheduleManager />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
          {
            path: "promote-students",
            element: (
              <AppErrorBoundary>
              <Suspense fallback={<div>Loading promote students...</div>}>
                <PromoteStudents />
              </Suspense>
              </AppErrorBoundary>
            ),
          },
        ],
      },
       {
    path: "/teacher/dashboard",
    element: (
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <RequireRole allowedRoles={["teacher"]}>
          <TeacherDashboard />
        </RequireRole>
      </Suspense>
    ),
    children: [
      {
        path: "mark-entry",
        element: (
          <AppErrorBoundary>
            <Suspense fallback={<div>Loading mark entry...</div>}>
              <MarkEntryPage />
            </Suspense>
          </AppErrorBoundary>
        ),
      },
      {
        path: "mark-entry-matrix",
        element: (
          <AppErrorBoundary>
            <Suspense fallback={<div>Loading mark entry matrix...</div>}>
              <MarksEntryMatrix />
            </Suspense>
          </AppErrorBoundary>
        ),
      },
    ],
  },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${ApiUrl}/user/me`, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        if (data && data.user) {
          dispatch(setUserInfo(data.user));
        } else {
          dispatch(setUserChecked(true));
        }
      })
      .catch(() => {
        dispatch(setUserChecked(true));
      });
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
};

export default Main;
