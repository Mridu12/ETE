// Layout.js

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import NavbarContent from "./NavbarContent";

const Layout = () => {
  return (
    <div className="whole-content">
      <main>
        <NavbarContent />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
