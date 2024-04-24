"use client"
import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const GraphicBrands = ({products}) => {
    //Ordeno los productos, teniendo en cuenta las ventas de cada uno. De mayor a menor
    const orderedProducts = products.sort((a, b) => b.sales - a.sales)

    //Selecciono los primeros 7 productos con mas ventas
    const topProducts = orderedProducts.slice(0,7)

    //Para crear el grafico, en un array voy agregando los titulos de cada producto y en otro las ventas
    const labels = []
    const sale = []
    topProducts.forEach(pro =>{
        labels.push(`${pro.title} ${pro.kilogram} Kg`)
        sale.push(pro.sales)
    })

//Parte de la configuracion del grafico    
const data = {
  labels: labels,
  datasets: [{
    label: 'Ventas',
    data: sale,
    backgroundColor: [
      'rgba(255, 99, 132, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(255, 205, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(201, 203, 207, 0.7)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

//Parte de la configuracion del grafico
 const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
  },
  plugins: {
    legend: {
      display: false
    }
  },
  responsive: true,
};
  return (
    <div className='w-full md:w-[60%]'>
        <h2 className='text-center text-xl font-bold mb-4'>Ventas por producto (los mas vendidos)</h2>
        <Bar data={data} options={config}/>
    </div>
  )
}

export default GraphicBrands

// backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(255, 159, 64, 0.2)',
//       'rgba(255, 205, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(201, 203, 207, 0.2)'
//     ],