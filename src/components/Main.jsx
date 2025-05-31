import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hero from './landing_page_components/Hero';
import About from './landing_page_components/About';
import Admission from './landing_page_components/Admission';
import Features from './landing_page_components/Features';
import AppLayout from './AppLayout';
import AdminDashboard from './AdminDashboard';
import AdminLoginForm from './AdminLoginForm';

const Main = () => {
    const appRouter = createBrowserRouter([
      {
          path: '/',
          element: <AppLayout />,
          children: [
              {
                  path: "/",
                  element: (<>
                            <Hero />
                            <About/>
                            <Admission/>
                            <Features/>
                            </>
              )

              },
              {
                path : "/admin/dashboard",
                element: <AdminDashboard />
              },
              {
                path: "/admin/login",
                element: <AdminLoginForm />
              }
          ]
      }
  ]);
  return (
    <div>
       <RouterProvider router={appRouter} />
    </div>
  )
}

export default Main
