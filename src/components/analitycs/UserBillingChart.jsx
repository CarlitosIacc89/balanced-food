"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const UserBillingChart = ({ purchaseMade }) => {
  // Objeto para mapear los números de mes a sus nombres correspondientes
  const monthNames = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  };

  // Array con los nombres de los meses en el orden correcto
  const orderedMonthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const purchasesPerMonth = purchaseMade?.reduce((acc, purchase) => {
    // Obtengo el mes de la fecha de creación de la compra
    const [dia, mes, año] = purchase?.createdAt.split("/");

    // Obtenemos el nombre del mes utilizando el objeto de mapeo
    const monthName = monthNames[mes];

    // Inicializamos el total de compras para este mes en cero si aún no existe
    acc[monthName] = acc[monthName] || 0;

    // Sumamos el total de la compra a las compras de este mes
    acc[monthName] += purchase.total;

    return acc;
  }, {});

  // Creo un nuevo objeto para almacenar las compras por mes en el orden correcto
  const orderedPurchasesPerMonth = {};

  // Itero sobre los nombres de los meses en el orden correcto y los agrego al nuevo objeto
  orderedMonthNames?.forEach((monthName) => {
    orderedPurchasesPerMonth[monthName] = purchasesPerMonth[monthName] || 0;
  });

  //Creo los array para pasarle los datos al grafico
  const value = [];
  for (const val in orderedPurchasesPerMonth) {
    value.push(`${Math.round(orderedPurchasesPerMonth[val])}`);
  }

  const data = {
    labels: orderedMonthNames,
    datasets: [
      {
        label: "Facturacion",
        data: value,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    responsive: true,
  };
  return (
    <>
      <Line options={config} data={data} />
    </>
  );
};

export default UserBillingChart;
