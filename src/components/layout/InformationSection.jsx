import React from "react";

const InformationSection = () => {
  return (
    <section className="mt-24 bg-white p-4 py-8 rounded-lg grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-auto text-center gap-8">
      <div className="px-4">
        <i className="fa-solid fa-truck-fast text-4xl text-green-400"></i>
        <p className="text-xl text-gray-500 font-semibold mt-4">
          Envio GRATIS dentro de cordoba capital para compras mayores a $20,000.
          Para compras menores el costo de envio sera de $1,000
        </p>
      </div>
      <div>
        <i className="fa-solid fa-money-bill-1-wave text-4xl"></i>
        <div className="mt-4 px-4 text-xl text-gray-500 font-semibold">
          <p>Formas de pago</p>
          <ul className="list-disc pl-4 mt-4">
            <li>Efectivo</li>
            <li>Tranferencia(en el momento de la entrega)</li>
            <li>Tarjetas de credito/debito (en 1 pago sin interes)</li>
          </ul>
        </div>
      </div>
      <div>
        <i className="fa-solid fa-clock text-4xl"></i>
        <p className="mt-4 px-4 text-xl text-gray-500 font-semibold">
          Horarios de entrega: De lunes a viernes de 9 a 18hs. Sabados de 9 a
          13hs
        </p>
      </div>
    </section>
  );
};

export default InformationSection;
