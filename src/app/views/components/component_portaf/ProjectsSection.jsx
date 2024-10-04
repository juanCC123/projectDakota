"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "DAKOTI AX",
    description: "Chat con IA",
    image: "/images/projects/1.jpg",
    tag: ["Aplicaciones", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "MindFulness",
    description: "App de meditación",
    image: "/images/projects/2.jpg",
    tag: ["Aplicaciones", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Diario de notas",
    description: "App de escritura",
    image: "/images/projects/3.jpg",
    tag: ["Aplicaciones", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Lista de tareas",
    description: "App para organizarte",
    image: "/images/projects/4.jpg",
    tag: ["Aplicaciones", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("Aplicaciones");
  const [areProjectsVisible, setAreProjectsVisible] = useState(true); // Estado para controlar la visibilidad de las tarjetas
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
    setAreProjectsVisible((prev) => !prev); // Alterna la visibilidad de las tarjetas
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Nuestros servicios
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="Aplicaciones"
          isSelected={tag === "Aplicaciones"}
        />
      </div>
      {/* Condicionar la renderización de las tarjetas */}
      {areProjectsVisible && (
        <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.li
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.4 }}>
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
              />
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectsSection;
