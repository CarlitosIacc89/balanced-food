import { firstCapitalLetter } from "@/helpers/firstCapitalLetter";
import React from "react";
import WhatsApp from "../icons/WhatsApp";
import Link from "next/link";

const ProductInformation = ({ product }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row mt-16 md:mt-32">
      <div className="border w-full bg-gray-50 rounded-lg">
        <h2 className="text-center text-slate-700 text-3xl bg-white p-2">
          Informacion adicional
        </h2>
        <table className="w-[90%] mx-auto">
          <tbody className="information">
            <tr>
              <th className="w-96 mb-2">Peso</th>
              <td className="w-[50%] text-center">{product.kilogram}kg</td>
            </tr>
            <tr>
              <th>Proteinas</th>
              <td className="text-center">{product.protein}%</td>
            </tr>
            <tr>
              <th>Calidad</th>
              <td className="text-center">
                {firstCapitalLetter(product.quality)}
              </td>
            </tr>
            <tr>
              <th>Etapa de vida</th>
              <td className="text-center">
                {firstCapitalLetter(product.stage)}
              </td>
            </tr>
            <tr>
              <th>Presentacion</th>
              <td className="text-center">{product.kilogram}kg</td>
            </tr>
            {product.specie === "dog" && (
              <tr>
                <th>Tamaño de raza</th>
                <td className="text-center">
                  {firstCapitalLetter(product.size)}
                </td>
              </tr>
            )}
            <tr>
              <th>Marca</th>
              <td className="text-center">{product.selectBrand}</td>
            </tr>
            <tr>
              <th>Sabor</th>
              <td className="text-center">{product.savour}</td>
            </tr>
            <tr>
              <th>Tipo de alimento</th>
              <td className="text-center">
                {firstCapitalLetter(product.type)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-blue-400 p-4 h-52 my-auto rounded-md text-white text-2xl text-center font-bold">
        <p> Tienes alguna duda o consulta por hacer? Contactanos 😉​</p>
        <Link
          href={"https://wa.me/153156874"}
          target="_blank"
          className="flex item center w-48 rounded-md justify-center gap-4 bg-green-400 mx-auto mt-9 p-2 hover:bg-green-500 transition-all duration-300"
        >
          <WhatsApp />
          <span>Whatsapp</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductInformation;
