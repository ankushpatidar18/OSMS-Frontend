import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import TopLine from './landing_page_components/TopLine';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopLine />
      <header>
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AppLayout;
