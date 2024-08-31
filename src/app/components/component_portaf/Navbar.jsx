"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

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
        {/* Botón de menú para móviles */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="text-white p-2 rounded hover:bg-gray-700">
            {navbarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
        {/* Menú para dispositivos grandes */}
        <div className="hidden md:flex md:space-x-4">
          <ul className="flex space-x-4 text-sm sm:text-base">
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
      {/* Menú desplegable en móviles */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bg-[#121212] border-t border-[#33353F] transition-transform transform ${
          navbarOpen ? "translate-y-0" : "-translate-y-full"
        }`}>
        <ul className="flex flex-col text-sm sm:text-base">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                href={link.path}
                title={link.title}
                newTab={link.newTab}
                onClick={() => setNavbarOpen(false)} // Cierra el menú al hacer clic en un enlace
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
