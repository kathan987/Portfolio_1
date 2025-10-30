import React, { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../../styles/shared/global.css";    // ✅ Fixed path
import "../../styles/shared/nav.css";       // ✅ Fixed path
import "../../styles/shared/footer.css";    // ✅ Fixed path

interface CommonLayoutProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}