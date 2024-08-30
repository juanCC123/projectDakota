"use client";
import React from "react";
import "@/../../public/style/card.css";

const cards = [
  {
    id: "1",
    title: "Diario personal",
    imageUrl: "/images/cards/book.jpg",
    url: "/pages/notebook",
  },
  {
    id: "2",
    title: "Meditación",
    imageUrl: "/images/med.png",
    url: "/pages/meditation",
  },
  {
    id: "3",
    title: "Orden",
    imageUrl: "/images/orden.jpg",
    url: "/pages/ToDoList",
  },
  {
    id: "4",
    title: "En proceso . . .",
    imageUrl: "/images/mantenimiento.png",
    url: "/pages/maintenance",
  },
];

const Cards = () => {
  const handleCardClick = (card) => {
    if (card.url) {
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
