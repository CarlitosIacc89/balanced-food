import Image from "next/image";
import React from "react";
import Spinner from "../icons/Spinner";

const Loader = () => {
  return (
    <div className="inset-0 fixed bg-black/80 flex items-center justify-center z-10">
      <Spinner color="text-white" />
    </div>
  );
};

export default Loader;
