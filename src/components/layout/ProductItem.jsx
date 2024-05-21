"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import ShoppingCart from "../icons/ShoppingCart";
import { CartContext } from "../Provider";
import { useSession } from "next-auth/react";
import Modal from "./Modal";
import AlertSuccess from "./AlertSuccess";
import Spinner from "../icons/Spinner";

const ProductItem = ({ item, modal, setModal }) => {
  const [gift, setGift] = useState(null);
  const [offer, setOffer] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [alert, setAlert] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [stock, setStock] = useState(item?.quantity);
  const [loading, setLoading] = useState(true);

  const session = useSession();
  const { status } = session;

  useEffect(() => {
    if (item?.kilogramOfGift && item?.kilogram) {
      setGift(item?.kilogram?.split("+")[1]);
    }
    if (item?.offer) {
      setOffer(true);
    }
  }, [item]);

  return (
    <>
      <AlertSuccess {...{ alert, setAlert }} />
      <Link
        href={`/products/${item?.specie}/${item?._id}`}
        className={`bg-gray-200 hover:bg-gray-300 flex flex-col shadow-md rounded-lg min-h-96 text-center p-2 relative overflow-hidden justify-between transition-all duration-300 max-w-60 mx-auto min-w-40 md:min-w-60 ${
          stock === 0 && "opacity-65"
        } hover:transform hover:scale-105`}
      >
        {gift && (
          <div className="absolute top-0 right-0 bg-blue-500 text-white font-bold p-1 md:p-2 text-sm md:text-base rounded-bl-lg">
            {gift}Kg de regalo! 🎁
          </div>
        )}
        {offer && (
          <div className="absolute flex justify-center top-10 left-2 text-sm sm:text-base lg:left-10 rounded-full p-2 sm:p-4 bg-blue-500 text-white font-bold w-10 sm:w-14">
            <span>-{item?.discount}%</span>
          </div>
        )}
        <div className="bg-white rounded-lg">
          {loading && (
            <p className="absolute inset-0 flex items-center justify-center">
              <Spinner color="text-black" />
            </p>
          )}
          <Image
            className="mx-auto object-cover h-[200px] sm:max-h-[200px]"
            src={item?.image}
            width={200}
            height={200}
            alt="image"
            onLoad={() => setLoading(false)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-gray-400 font-bold text-sm p-1">
            {item?.stage.toUpperCase()}
          </p>
          <p className="text-gray-600 font-bold">
            {item?.title} {item?.kilogram}Kg
          </p>
          <p
            className={
              stock > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"
            }
          >
            {item?.quantity} disponible
          </p>

          {offer ? (
            <div className="flex flex-col">
              <p className="font-bold text-blue-500">OFERTA!!</p>
              <div className="flex gap-2 items-center justify-center">
                <p className=" text-gray-500 font-bold">
                  <del>${parseInt(item?.publicPrice).toLocaleString("AR")}</del>
                </p>
                <p className="text-xl font-bold text-blue-500">
                  $
                  {Math.round(
                    parseInt(item?.publicPrice) -
                      (item?.discount / 100) * parseInt(item?.publicPrice)
                  ).toLocaleString("AR")}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xl font-bold">
              ${parseInt(item?.publicPrice).toLocaleString("en")}
            </p>
          )}
        </div>
        <button
          type="button"
          disabled={item?.quantity === 0 ? true : false}
          className="bg-red-500 font-bold mx-auto mt-4 text-sm sm:text-base disabled:bg-gray-500 disabled:text-slate-300 hover:bg-red-600 transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            if (status !== "authenticated") {
              setModal(true);
              return;
            } else {
              setShowPopUp(false);
              setAlert(true);
              addToCart(item);

              setTimeout(() => {
                setAlert(false);
              }, 2000);
            }
          }}
        >
          <ShoppingCart />
          Agregar
        </button>
      </Link>
    </>
  );
};

export default ProductItem;
