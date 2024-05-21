import Link from "next/link";
import React from "react";

const DivHidden = ({
  specie,
  puppy,
  className = "w-52",
  close,
  setClose,
  menuClose,
  setMenuClose,
}) => {
  return (
    <div
      className={`absolute flex flex-col gap-2 px-2 py-4 innerLink ${className} bg-white rounded-md z-10 `}
      onClick={() => {
        setClose(!close);
        if (menuClose) {
          setMenuClose(!menuClose);
        }
      }}
    >
      <Link href={`/products/${specie}/adult`}>Adultos</Link>
      <Link href={`/products/${specie}/${puppy.toLowerCase()}`}>{puppy}</Link>
      <Link href={`/products/${specie}/specific`}>Especificos</Link>
    </div>
  );
};

export default DivHidden;
