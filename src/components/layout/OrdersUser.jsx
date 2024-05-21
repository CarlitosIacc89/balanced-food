import React from "react";

const OrdersUser = ({ dataUser }) => {
  return (
    <div className="font-bold text-center mt-10">
      <h2 className="text-xl">Tus ordenes</h2>
      {dataUser?.purchasesMade?.length > 0 ? (
        dataUser?.purchasesMade?.map((order, index) => (
          <div className="space-y-4 my-4 w-full md:w-3/5 mx-auto" key={index}>
            <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="font-normal text-xl">
                  Orden creada el{" "}
                  <span className="font-bold text-slate-800">
                    {order?.createdAt}
                  </span>
                </h2>

                <span className="relative size-5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 opacity-100 group-open:opacity-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 opacity-0 group-open:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-start leading-relaxed text-gray-700">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Producto
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Cantidad
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Precio unitario
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Importe
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {order?.items?.map((item, index) => (
                        <tr key={index} className="table-orders">
                          <td className="text-center">{item.title}</td>
                          <td>{item?.quantity}</td>
                          <td>$ {item?.price.toLocaleString("AR")}</td>
                          <td>
                            ${" "}
                            {(item?.price * item?.quantity).toLocaleString(
                              "AR"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-start mt-4">
                Total de la orden: ${order?.total.toLocaleString("AR")}
              </p>
            </details>
          </div>
        ))
      ) : (
        <div className="text-sm">No haz realizado ninguna orden</div>
      )}
    </div>
  );
};

export default OrdersUser;
