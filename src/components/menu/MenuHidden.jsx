"use client";
import Link from "next/link";
import React from "react";
import Close from "../icons/Close";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";
import DivHidden from "./DivHidden";
import { signOut } from "next-auth/react";

const MenuHidden = ({
  menu,
  setMenu,
  dog,
  cat,
  setDog,
  setCat,
  session,
  userName,
}) => {
  const link = "flex items-center justify-between";
  const borderBottom =
    "hover:border-b-4 transition-all duration-100  hover:border-red-400";
  return (
    <nav className="flex flex-col gap-8 bg-black/60 w-full h-screen absolute top-0 left-0 z-10">
      <span
        className="self-end cursor-pointer mr-4 my-4 text-2xl "
        onClick={() => setMenu(!menu)}
      >
        <Close className="h-8 w-8" />
      </span>
      <div
        className={`absolute h-full flex flex-col gap-8 top-0 ${
          menu ? "left-0" : "-left-80"
        } bg-gray-500 w-72 z-50 p-8 text-white font-bold`}
      >
        <Link href={"/"} onClick={() => setMenu(!menu)}>
          Inicio
        </Link>

        <div className="relative">
          <Link
            href={""}
            className={`${link} flex gap-1 items-center `}
            onClick={() => {
              setDog(!dog);
              setCat(false);
            }}
          >
            Perros
            {dog ? <ChevronUp /> : <ChevronDown />}
          </Link>
          <div className={`${dog ? "block" : "hidden"}`}>
            <DivHidden
              menuClose={menu}
              setMenuClose={setMenu}
              close={dog}
              setClose={setDog}
              specie={"dog"}
              puppy={"Cachorro"}
              className="w-full"
            />
          </div>
        </div>

        <div className="relative">
          <Link
            href={""}
            className={`${link} flex gap-1 items-center `}
            onClick={() => {
              setCat(!cat);
              setDog(false);
            }}
          >
            Gatos
            {cat ? <ChevronUp /> : <ChevronDown />}
          </Link>
          <div className={cat ? "block" : "hidden"}>
            <DivHidden
              menuClose={menu}
              setMenuClose={setMenu}
              close={cat}
              setClose={setCat}
              specie={"cat"}
              puppy={"Kitten"}
              className="w-full"
            />
          </div>
        </div>
        <Link href={"/kgs-de-regalo"} className={borderBottom}>
          Kg de regalo
        </Link>
        <Link href={"/offers"} className={borderBottom}>
          Ofertas
        </Link>
        {session.status === "authenticated" ? (
          <>
            <Link
              href={"/profile"}
              className={`${borderBottom} text-center text-xl`}
              onClick={() => setMenu(!menu)}
            >
              {userName}
            </Link>
            <Link
              href={"/register"}
              className="text-center border py-2 rounded-md bg-red-400 text-white"
              onClick={() => {
                setMenu(!menu);
                signOut();
              }}
            >
              Salir
            </Link>
          </>
        ) : (
          <>
            <Link href={""} className={`${borderBottom} text-center text-xl`}>
              Login
            </Link>
            <Link
              href={"/register"}
              className="text-center border py-2 rounded-md bg-red-400 text-white"
              onClick={() => setMenu(!menu)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default MenuHidden;
