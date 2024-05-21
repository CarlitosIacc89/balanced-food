"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraphicUsers = ({ users }) => {
  let billingAndUsers = []; //Array para capturar cada usuario y su respectiva facturacion

  users?.forEach((user) => {
    let data = {}; //Objeto que posteriormente insertare en el array con los datos

    //Uso el reduce() para sumar todos los 'totales' de cada orden del usuario
    let totalCharged = user?.purchasesMade?.reduce(
      (total, purchase) => total + purchase.total,
      0
    );

    //Capturo los datos en el objeto
    data = { name: user.name, invoiced: totalCharged };

    billingAndUsers = [...billingAndUsers, data]; //Los inserto en el array
  });

  //Ordeno los usuarios con respecto a la facturacion de mayor a menor
  const billingAndUsersOrdered = billingAndUsers?.sort(
    (a, b) => b.invoiced - a.invoiced
  );

  //Muestro solo los primeros 7 usuarios que mas facturaron
  const topUsers = billingAndUsersOrdered?.slice(0, 7);

  //Datos para el grafico.
  const labels = [];
  const invoiced = [];
  topUsers?.forEach((user) => {
    labels.push(user.name);
    invoiced.push(user.invoiced);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total facturado",
        data: invoiced,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
  };
  return (
    <div className="w-[80%] md:w-[30%] mx-auto mt-10 md:mt-0">
      <h2 className="text-center text-xl font-bold">
        Usuarios con mas compras
      </h2>
      <Doughnut data={data} options={config} />
    </div>
  );
};

export default GraphicUsers;
