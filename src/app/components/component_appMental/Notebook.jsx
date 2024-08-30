"use client";
import { useState } from "react";
import { FaYoutube, FaSpotify, FaSave } from "react-icons/fa";
import { Document, Packer, Paragraph, TextRun } from "docx";
import "@/../../public/style/notebook.css";

export default function Home() {
  const [content, setContent] = useState("");
  const [font, setFont] = useState("font-sans");
  const [showCircles, setShowCircles] = useState(true);

  const saveAsWord = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(content)],
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

  return (
    <div className="min-h-screen p-8 flex flex-col items-center relative">
      {}
      <div className="w-[90vw] max-w-screen-2xl bg-white shadow-2xl rounded-3xl p-6">
        {}
        <div className="flex justify-around w-full bg-gray-800 text-white p-6 rounded-t-3xl shadow-md mb-4">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer">
            <FaYoutube className="text-red-600 text-4xl icon hover:text-red-800 transition-transform duration-300" />
          </a>
          <a
            href="https://www.spotify.com"
            target="_blank"
            rel="noopener noreferrer">
            <FaSpotify className="text-green-600 text-4xl icon hover:text-green-800 transition-transform duration-300" />
          </a>
          <FaSave
            className="text-blue-600 text-4xl icon hover:text-blue-800 transition-transform duration-300"
            onClick={saveAsWord}
          />
        </div>

        {}
        <div className={`bg-white rounded-b-3xl p-6 ${font}`}>
          <textarea
            className="w-full h-36 p-6 border border-gray-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe aquí..."
          />
          {}
          <div className="mt-6">
            <label className="block text-gray-700 text-lg">
              Selecciona una fuente:
            </label>
            <select
              onChange={(e) => setFont(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-3xl text-lg">
              <option value="font-sans">Sans</option>
              <option value="font-serif">Serif</option>
              <option value="font-mono">Monospace</option>
              <option value="font-extralight">Extra Light</option>
              <option value="font-bold">Bold</option>
            </select>
          </div>
        </div>
      </div>

      {}
      {showCircles && (
        <div className="circle-container">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      )}

      {}
      <button
        className="toggle-btn"
        onClick={() => setShowCircles(!showCircles)}>
        {showCircles ? "Ocultar Círculos" : "Mostrar Círculos"}
      </button>
    </div>
  );
}
