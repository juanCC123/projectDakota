"use client";

import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { FaRobot } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";

const inference = new HfInference("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");

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // No envía mensajes vacíos

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const responseStream = inference.chatCompletionStream({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [{ role: "user", content: input }],
        max_tokens: 500,
      });

      let botMessageContent = "";

      // Leer la respuesta en tiempo real :)
      for await (const chunk of responseStream) {
        botMessageContent += chunk.choices[0]?.delta?.content || "";
      }

      const botMessage = {
        role: "bot",
        content:
          botMessageContent || "Lo siento, no pude generar una respuesta.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMessage = {
        role: "bot",
        content: "Hubo un error al obtener la respuesta.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-300 to-blue-100 p-4">
      <h1 className="flex items-center text-3xl font-semibold mb-4 text-white">
        <FaRobot className="text-blue-800 mr-2" />
        Chatbot DAKOTA
      </h1>
      <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-lg bg-white shadow-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg mb-2 ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 self-start"
            }`}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="animate-pulse bg-gray-300 h-8 rounded mb-2" />
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-3 border border-gray-300 rounded-lg"
          placeholder="Escribe un mensaje..."
        />
        <button
          type="submit"
          className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
          <RiSendPlane2Fill />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
