"use client";

import { Button, Navbar } from "flowbite-react";
import { ThemeBtn } from "../components";
import logo from "../assets/react.svg";
import logo1 from "../assets/maximize.png";

function Header() {
  return (
    <div>
      <Navbar fluid>
        <Navbar.Brand href="https://github.com/Brute-Coder">
          <img src={logo1} className="mr-3 h-6 sm:h-9" alt="seDirect logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            seDirect
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <ThemeBtn />
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
