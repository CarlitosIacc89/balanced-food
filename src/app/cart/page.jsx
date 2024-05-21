"use client";
import { CartContext } from "@/components/Provider";
import { UseProfile } from "@/components/UseProfile";
import Close from "@/components/icons/Close";
import Left from "@/components/icons/Left";
import Spinner from "@/components/icons/Spinner";
import ConfirmOrder from "@/components/layout/ConfirmOrder";
import DataSendPurchase from "@/components/layout/DataSendPurchase";
import ErrorUser from "@/components/layout/ErrorUser";
import Loader from "@/components/layout/Loader";
import OrdersUser from "@/components/layout/OrdersUser";
import SuccessUser from "@/components/layout/SuccessUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const CartPage = () => {
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [order, setOrder] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [failedOrder, setFailedOrder] = useState(false);
  const [text, setText] = useState(null);

  const {
    cartProducts,
    addToCart,
    deleteProduct,
    setCartProducts,
    totalPrice,
    totalProducts,
    saveCartToLocalStorage,
  } = useContext(CartContext);

  const { data: dataUser, loading: loadingUser } = UseProfile();

  const router = useRouter();

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sale: [...cartProducts] }),
      });

      if (!res.ok) {
        throw new Error("Ups! Hubo un error");
      }
      const respuesta = await res.json();
      setText(respuesta);
      setOrderComplete(true);
      setCartProducts([]);
      saveCartToLocalStorage([], dataUser._id);
      setPurchaseCompleted(false);

      setTimeout(() => {
        setOrderComplete(false);
      }, 3000);
      return;
    } catch (error) {
      setFailedOrder(true);
      const err = error.message;
      setText(err);

      setTimeout(() => {
        setFailedOrder(false);
      }, 3000);
    }
  };
  return (
    <section className="mt-8 min-h-[46vh]">
      {purchaseCompleted && (
        <ConfirmOrder
          {...{ order, setPurchaseCompleted, purchaseCompleted, handleSubmit }}
        />
      )}
      {loadingUser && (
        <p className="absolute inset-0 flex items-center justify-center">
          <Spinner color="text-white" />
        </p>
      )}
      {orderComplete && (
        <SuccessUser text={text.message} setSuccessText={setText} />
      )}
      {failedOrder && <ErrorUser errorText={text} setErrorText={setText} />}

      <h1 className="text-center mb-10 text-3xl font-bold text-gray-800">
        Tu carrito
      </h1>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <button
          type="button"
          className=" w-52 flex items-center text-gray-700 font-bold  mb-8 rounded-none border-gray-700 border-t-2 border-b-2"
          onClick={() => router.push("/products/dog/adult")}
        >
          <Left />
          Ir a la tienda
        </button>
        {cartProducts?.length > 0 && (
          <button
            type="button"
            className=" w-40 flex items-center text-white font-bold mb-8 bg-red-500 hover:bg-red-600 transition-all duration-300"
            onClick={() => {
              setCartProducts([]);
              saveCartToLocalStorage([], dataUser._id);
            }}
          >
            Vaciar carrito
          </button>
        )}
      </div>
      <div className=" flex flex-col items-center gap-2">
        <div className="w-full flex flex-col">
          {cartProducts?.length === 0 && (
            <div className="text-center font-bold text-gray-600">
              No hay productos en tu carrito
            </div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product) => (
              <div
                key={product._id}
                className="flex border items-center gap-2 justify-evenly text-sm md:text-base min-h-[50px]"
              >
                <div className="hidden sm:block">
                  <Image
                    className="max-h-[50px]"
                    src={product.image}
                    width={50}
                    height={50}
                    alt="image"
                  />
                </div>
                <div className="w-[250px] text-gray-500 font-bold">
                  <span>{product.title} </span>
                  <span>{product.kilogram}Kg</span>
                </div>
                <div className="flex items-center gap-2 w-[90px]">
                  <button
                    type="button"
                    className="border bg-green-400 items-center  px-1 py-0 text-xl w-7 h-7"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                  <span>{product.cantidad}</span>
                  <button
                    type="button"
                    className="border items-center bg-red-400 px-1 py-0 text-xl w-7 h-7"
                    onClick={() => deleteProduct(product)}
                  >
                    -
                  </button>
                </div>
                <div className="w-[73px]">
                  <span className="font-extrabold text-gray-600">
                    $
                    {product.offer
                      ? Math.round(
                          (parseInt(product.publicPrice) -
                            (product.discount / 100) *
                              parseInt(product.publicPrice)) *
                            product.cantidad
                        ).toLocaleString("AR")
                      : Math.round(
                          parseInt(product.publicPrice) * product.cantidad
                        ).toLocaleString("AR")}
                  </span>
                </div>
              </div>
            ))}
          {cartProducts?.length > 0 && (
            <div className="flex flex-col md:flex-row justify-evenly bg-gray-200 h-12 items-center text-gray-700 font-bold text-sm sm:text-base">
              <div>CANTIDAD DE PRODUCTOS: {totalProducts}</div>
              <div className="flex gap-4 border">
                <span>TOTAL:</span>{" "}
                <span>${Math.round(totalPrice).toLocaleString("AR")}</span>
              </div>
            </div>
          )}
        </div>
        {cartProducts.length > 0 && dataUser && (
          <DataSendPurchase
            {...{ dataUser, handleSubmit, setPurchaseCompleted, setOrder }}
          />
        )}
      </div>

      <OrdersUser dataUser={dataUser} />
    </section>
  );
};

export default CartPage;
