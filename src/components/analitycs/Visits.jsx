"use client";
import React from "react";

const Visits = ({ visits }) => {
  return (
    <div className="bg-gray-100 flex flex-col gap-2 border p-4 text-center rounded-xl">
      <span className="font-bold">Visitas a la pagina</span>
      <span className="text-4xl font-extrabold">{visits?.visits}</span>
    </div>
  );
};

export default Visits;
