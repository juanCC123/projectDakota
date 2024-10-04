"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start">
          <h1 className="text-white mb-2 text-3xl sm:text-4xl lg:text-6xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-white">
              Proyecto DAKOTA{" "}
            </span>{" "}
            <br></br>
            <TypeAnimation
              sequence={[
                "Juan Villarreal",
                1000,
                "Angie Forero",
                1000,
                "Hannah Blanco",
                1000,
                "Ivan Salazar",
                1000,
                "Joaquín Osio",
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-base mb-6 lg:text-lg">
            Nuestro proyecto quiere servir a tu salud mental.
          </p>
          <div>
          <Link
  href="/#contact"
  className="px-1 inline-block py-1 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-400 to-blue-300 hover:bg-slate-200 text-white">
  <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">Comunícate con nosotros</span>
</Link>
<Link
  href="/"
  className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-400 to-blue-300 hover:bg-slate-800 text-white mt-3">
  <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
    Download CV
  </span>
</Link>


          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[375px] lg:h-[375px] relative">
            <Image
              src="/images/hero-image.png"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={250}
              height={250}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
