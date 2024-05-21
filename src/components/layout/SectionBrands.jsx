import Image from "next/image";
import Link from "next/link";
import React from "react";

const SectionBrands = ({ brands }) => {
  return (
    <div className="mt-8 grid justify-center lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2  gap-4 sm:gap-2 brands">
      {brands &&
        brands?.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand.title}`}>
            <Image src={brand.image} width={100} height={100} alt="" />
          </Link>
        ))}
    </div>
  );
};

export default SectionBrands;
