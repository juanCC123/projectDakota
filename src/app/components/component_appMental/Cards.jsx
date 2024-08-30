"use client";
import React from "react";
import "@/../../public/style/card.css";

const cards = [
  {
    id: "1",
    title: "Diario personal",
    imageUrl: "/images/cards/book.jpg",
    url: "/pages/notebook", // URL del componente que quieres abrir en una nueva pestaña
  },
  {
    id: "2",
    title: "Meditación",
    imageUrl: "/images/med.png",
    url: "/pages/meditation", // Añade la URL correspondiente para Meditación
  },
  {
    id: "3",
    title: "Orden",
    imageUrl: "/images/orden.jpg",
    url: "/pages/ToDoList", // URL del componente que quieres abrir en una nueva pestaña
  },
  {
    id: "4",
    title: "En proceso . . .",
    imageUrl: "/images/mantenimiento.png",
    url: "/pages/maintenance", // Añade la URL correspondiente para En proceso
  },
];

const Cards = () => {
  const handleCardClick = (card) => {
    if (card.url) {
      // Abre una nueva pestaña con la URL del componente
      window.open(card.url, "_blank");
    }
  };

  return (
    <div className="carousel-container">
      <div className="cards-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => handleCardClick(card)}>
            <div className="card-image-wrapper">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="card-image"
              />
            </div>
            <div className="card-title">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
