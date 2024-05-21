import React from "react";

const Orders = ({ orders }) => {
  const ordersReceived = orders?.length;
  return (
    <div className="bg-gray-100 flex flex-col gap-2 border p-4 text-center rounded-xl">
      <span className="font-bold">Ordenes recibidas</span>
      <span className="font-extrabold text-4xl">{ordersReceived}</span>
    </div>
  );
};

export default Orders;
