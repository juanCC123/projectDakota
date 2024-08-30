"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Misión",
    id: "mision",
    content: (
      <p>
        Ofrecer un espacio seguro y educativo en línea donde las personas puedan
        encontrar apoyo, información y herramientas prácticas para gestionar su
        salud mental de manera efectiva y proactiva.
      </p>
    ),
  },
  {
    title: "Visión",
    id: "vision",
    content: (
      <p>
        Lograr un cambio positivo en la salud mental global mediante la
        expansión de nuestras herramientas y recursos digitales, promoviendo una
        comprensión profunda y accesible de la salud mental en todo el mundo.
      </p>
    ),
  },
  {
    title: "Contribuyentes externos",
    id: "CE",
    content: (
      <ul className="list-disc pl-2">
        <li>Mónica Hurtado</li>
      </ul>
    ),
  },
  {
    title: "Compañías colaboradoras",
    id: "CC",
    content: (
      <ul className="list-disc pl-2">
        <li>
          <a
            class="text-yellow-500 hover:text-orange-500 hover:animate-blink"
            href="https://www.colpuyana.edu.co/"
            target="_blank"
            rel="noopener noreferrer">
            Colegio Técnico Industrial José Elías Puyana
          </a>
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("mision");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/brains-mov.gif" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">Sobre nosotros</h2>
          <p className="text-base lg:text-lg">
            En DAKOTA, nos dedicamos a brindar apoyo integral para el bienestar
            mental y emocional de cada persona que se cruza en nuestro camino.
            Creemos que la salud mental es fundamental para llevar una vida
            plena y equilibrada, y estamos aquí para acompañarte en cada paso de
            tu viaje hacia el bienestar.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("mision")}
              active={tab === "mision"}>
              {" "}
              Misión{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("vision")}
              active={tab === "vision"}>
              {" "}
              Visión{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("CE")}
              active={tab === "CE"}>
              {" "}
              Contribuyentes externos{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("CC")}
              active={tab === "CC"}>
              {" "}
              Compañias colaboradoras{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
