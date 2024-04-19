import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { ThemeProvider } from "./context/theme";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";

function Layout() {
  const [themeMode, setThemeMode] = useState("dark");
  const lightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };
  useEffect(() => {
    const tempVar = document.querySelector("html").classList;
    tempVar.remove("light", "dark");
    tempVar.add(themeMode);
  }, [themeMode]);
  return (
    <ThemeProvider
      value={{ lightTheme, darkTheme, themeMode }}
      className="overscroll-none"
    >
      <div
        className={`h-screen w-screen relative overscroll-none
        ${
          document.querySelector("html").classList[0] === "dark"
            ? "bg-gradient-to-r from-blue-200 to-cyan-200"
            : "bg-gradient-to-b from-slate-500 to-slate-800"
        }
       `}
      >
        <Header />
        <Outlet />
        <Analytics />
        <SpeedInsights />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
