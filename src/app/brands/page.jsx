import InformationSection from "@/components/layout/InformationSection";
import SectionBrands from "@/components/layout/SectionBrands";
import { BASE_URL_DEPLOY } from "@/helpers/urls";
import React from "react";

async function getBrands() {
  try {
    const res = await fetch(`${BASE_URL_DEPLOY}/api/brands`);
    if (!res.ok) {
      throw new Error("Hubo un error al obtener las marcas");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

const PageBrands = async () => {
  const brands = await getBrands();

  return (
    <section className="mt-8  mx-auto">
      <fieldset className="border-2 border-red-300 rounded-md p-4">
        <legend className="text-center">
          <h1 className="font-bold text-slate-700 text-3xl">
            Marcas comercializables
          </h1>
        </legend>
        <SectionBrands brands={brands.brands} />
      </fieldset>

      <InformationSection />
    </section>
  );
};

export default PageBrands;
