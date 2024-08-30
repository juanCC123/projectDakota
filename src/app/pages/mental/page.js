// src/App.js
import React from "react";
import Header from "@/app/components/component_appMental/Header";
import Cards from "@/app/components/component_appMental/Cards";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Header />
      <Cards />
    </div>
  );
};

export default App;
