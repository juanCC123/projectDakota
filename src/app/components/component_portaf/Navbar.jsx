"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  {
    title: "Ingresar",
    path: "/pages/login",
    newTab: true,
  },
  {
    title: "Acerca de",
    path: "#about",
    newTab: false,
  },
  {
    title: "Proyectos",
    path: "#projects",
    newTab: false,
  },
  {
    title: "Contáctanos",
    path: "#contact",
    newTab: false,
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#121212] border-b border-[#33353F]">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3">
        <Link href="/" className="text-xl sm:text-2xl font-semibold text-white">
          DAKOTA ES
        </Link>
        <div className="md:hidden flex items-center">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="text-white p-2 rounded hover:bg-gray-700">
              <Bars3Icon className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="text-white p-2 rounded hover:bg-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        <div className={`md:flex ${navbarOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0 md:space-x-6 text-sm sm:text-base">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  href={link.path}
                  title={link.title}
                  newTab={link.newTab}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
