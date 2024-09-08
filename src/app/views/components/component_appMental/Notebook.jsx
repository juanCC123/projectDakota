"use client";
import { useState } from "react";
import { FaYoutube, FaSpotify, FaSave, FaHeart } from "react-icons/fa";
import { Document, Packer, Paragraph, TextRun } from "docx";
import "@/../../public/style/notebook.css";

export default function Home() {
  const [content, setContent] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [font, setFont] = useState("font-sans");
  const [showPopup, setShowPopup] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [lastGratitude, setLastGratitude] = useState("");
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const motivationalMessages = [
    "¡Tu gratitud ilumina tu día, sigue así!",
    "¡Eres una persona maravillosa, nunca dejes de agradecer!",
    "¡Tus palabras tienen el poder de transformar!",
    "¡Escribir es el primer paso para grandes cosas!",
    "¡Tu gratitud es inspiradora, sigue adelante!",
    "¡Estás haciendo un trabajo increíble, sigue agradeciendo!",
    "¡Cada palabra de agradecimiento te acerca más a la felicidad!",
    "¡Qué bonito es ver tu gratitud plasmada en palabras!",
    "¡Tus palabras reflejan la luz que llevas dentro!",
    "¡Eres una fuente de energía positiva, nunca lo olvides!",
    "¡Gracias por ser un ejemplo de gratitud y positividad!",
    "¡Sigue escribiendo, cada palabra cuenta!",
    "¡Esas palabras tuyas son como un rayo de sol en un día nublado!",
    "¡Lo que escribiste refleja tu grandeza!",
    "¡Eres increíblemente inspirador(a)!",
    "¡La gratitud que escribes se siente en el aire!",
    "¡Tus palabras cambian el mundo, una letra a la vez!",
    "¡Qué satisfacción es ver lo que has escrito!",
    "¡El agradecimiento te convierte en una mejor versión de ti mismo!",
    "¡Cada palabra es un paso más hacia una vida plena!",
  ];

  const saveAsWord = () => {
    const fontMapping = {
      "font-sans": "Arial",
      "font-serif": "Times New Roman",
      "font-mono": "Courier New",
      "font-light": "Calibri Light",
      "font-bold": "Calibri Bold",
      "font-thin": "Arial Narrow",
      "font-extralight": "Calibri Extra Light",
    };

    const selectedFont = fontMapping[font] || "Arial";

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Contenido: \n${content}\n`,
                  font: selectedFont,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Gratitud: \n${gratitude}\n`,
                  font: selectedFont,
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc)
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "notebook.docx";
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error generating DOCX:", error);
      });
  };

  const saveGratitude = () => {
    const trimmedGratitude = gratitude.trim();

    if (trimmedGratitude === "" || trimmedGratitude === lastGratitude) {
      return;
    }

    setLastGratitude(trimmedGratitude);

    const randomMessage =
      motivationalMessages[
        Math.floor(Math.random() * motivationalMessages.length)
      ];
    setMotivationalMessage(randomMessage);
    setShowPopup(true);
    setShowHeartAnimation(true);

    setTimeout(() => {
      setShowPopup(false);
      setShowHeartAnimation(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-gray-100 relative">
      {/* Cuadro emergente motivacional */}
      {showPopup && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-xl shadow-lg text-center animate-fade-in-out">
          <p>{motivationalMessage}</p>
        </div>
      )}

      {/* Animación del corazón rojo */}
      {showHeartAnimation && (
        <div className="heart-animation">
          <FaHeart />
        </div>
      )}

      {/* Notebook container */}
      <div
        className={`w-[95vw] max-w-screen-lg bg-white shadow-lg rounded-2xl p-4 md:p-6 mb-4 ${font}`}>
        {/* Header with icons */}
        <div className="flex justify-around w-full bg-gray-800 text-white p-4 rounded-t-2xl shadow-md mb-4">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer">
            <FaYoutube className="text-red-600 text-3xl icon hover:text-red-800 transition-transform duration-300" />
          </a>
          <a
            href="https://www.spotify.com"
            target="_blank"
            rel="noopener noreferrer">
            <FaSpotify className="text-green-600 text-3xl icon hover:text-green-800 transition-transform duration-300" />
          </a>
          <FaSave
            className="text-blue-600 text-3xl icon hover:text-blue-800 transition-transform duration-300"
            onClick={saveAsWord}
          />
        </div>

        {/* Content section */}
        <div className="bg-white rounded-b-2xl p-4 md:p-6">
          <textarea
            className="w-full h-36 p-4 border border-gray-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe aquí..."
          />
        </div>

        {/* Gratitude section */}
        <div className="mt-4">
          <label className="block text-gray-700 text-lg">
            ¿Por qué estás agradecido hoy?
          </label>
          <textarea
            className="w-full h-24 p-4 mt-2 border border-gray-300 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            placeholder="Escribe una pequeña oración..."
          />
        </div>

        {/* Botón para guardar la oración de gratitud */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-green-500 text-white p-3 rounded-full shadow-md flex items-center justify-center hover:bg-green-600 transition-transform duration-300"
            onClick={saveGratitude}>
            <FaHeart className="mr-2" /> Guardar Gratitud
          </button>
        </div>

        {/* Font selection */}
        <div className="mt-6">
          <label className="block text-gray-700 text-lg">
            Selecciona una fuente:
          </label>
          <select
            onChange={(e) => setFont(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-lg">
            <option value="font-sans">Sans Serif</option>
            <option value="font-serif">Serif</option>
            <option value="font-mono">Monospace</option>
            <option value="font-light">Light</option>
            <option value="font-bold">Bold</option>
            <option value="font-thin">Thin</option>
            <option value="font-extralight">Extra Light</option>
          </select>
        </div>
      </div>
    </div>
  );
}
