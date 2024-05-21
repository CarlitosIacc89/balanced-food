"use client";
import React, { useEffect, useState } from "react";

const Revenue = ({ orders }) => {
  const [revenue, setRevenue] = useState(0);
  // const revenue = orders.reduce((total, order) => total + order.revenueOrder, 0)

  useEffect(() => {
    setRevenue(
      orders?.reduce((total, order) => total + order?.revenueOrder, 0)
    );
  }, [orders]);

  return (
    <div className="bg-gray-100 flex flex-col gap-2 border p-4 text-center rounded-xl">
      <span className="font-bold">Ganancia neta</span>
      <span className="font-extrabold text-4xl">
        ${revenue ? revenue?.toLocaleString("AR") : 0}
      </span>
    </div>
  );
};

export default Revenue;
