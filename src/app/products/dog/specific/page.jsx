import InformationSection from "@/components/layout/InformationSection";
import ProductItem from "@/components/layout/ProductItem";
import SectionHeaderFood from "@/components/layout/SectionHeaderFood";
import SectionProducts from "@/components/layout/SectionProducts";
import { BASE_URL_DEPLOY } from "@/helpers/urls";
import Image from "next/image";
import React from "react";

async function getData() {
  try {
    const res = await fetch(
      `${BASE_URL_DEPLOY}/api/products?specific=true&specie=dog`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw Error("Hubo un error al obtener los productos");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
}

const PageDogSpecific = async () => {
  const items = await getData();

  return (
    <section className="mt-8">
      <SectionHeaderFood
        img={"/Perros-especificos.jpg"}
        text={"Alimentos especificos para perros"}
        items={items}
      />
      {items.length > 0 ? (
        <SectionProducts items={items} />
      ) : (
        <div className="w-full col-span-full">
          <Image
            className="mx-auto"
            src={"/Loader.gif"}
            width={100}
            height={100}
            alt=""
          />
        </div>
      )}
      <InformationSection />
    </section>
  );
};

export default PageDogSpecific;
