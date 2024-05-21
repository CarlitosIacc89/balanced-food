import React from "react";

const SlidingBar = () => {
  return (
    <div className="marquee  bg-gradient-to-t from-red-800 to-black/75 text-white py-2 px-4 mb-8">
      <div className="marquee-content space-x-60 font-bold">
        <p>
          <span className="text-2xl pb-1">🚗</span>​ Envios a domicilio SIN
          CARGO dentro de Cordoba Capital
        </p>
        <p>
          <span className="text-2xl">​💥​</span>
          Los mejores precios
        </p>
        <p>
          ​​<span className="text-2xl pb-1.5">💳</span>​ Paga tu compra en tu
          domicilio. Recibimos tarjetas
        </p>
      </div>
    </div>
  );
};

export default SlidingBar;
