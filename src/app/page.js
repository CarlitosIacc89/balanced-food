import Check from "@/components/icons/Check";
import Hero from "@/components/layout/Hero";
import SectionHomeDiet from "@/components/layout/SectionHomeDiet";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Link from "next/link";
import SectionBrands from "@/components/layout/SectionBrands";
import RelatedCarrousel from "@/components/layout/RelatedCarrousel";
import InformationSection from "@/components/layout/InformationSection";
import ProductItem from "@/components/layout/ProductItem";
import Image from "next/image";

const getData = async () => {
  try {
    let productsApi = `http://localhost:3000/api/products`,
      brandsApi = `http://localhost:3000/api/brands`,
      visitsApi = `http://localhost:3000/api/visits`,
      productsFetch = fetch(productsApi, { cache: "no-store" }),
      brandsFetch = fetch(brandsApi, { cache: "no-store" }),
      visitsFetch = fetch(visitsApi, { cache: "no-store" }),
      [productsRes, brandsRes, visitsRes] = await Promise.all([
        productsFetch,
        brandsFetch,
        visitsFetch,
      ]);

    if (!productsRes.ok) {
      throw new Error("Hubo un error al obtener los productos");
    }
    if (!brandsRes.ok) {
      throw new Error("Hubo un error al obtener las marcas");
    }

    const productsData = await productsRes.json();
    const brandsData = await brandsRes.json();
    const visitsData = await visitsRes.json();

    const mainBrands = brandsData.brands.slice(0, 6);
    const mainProducts = productsData.sort((a, b) => b.sales - a.sales);
    const topProducts = mainProducts.slice(0, 7);

    return { productsData, brandsData, mainBrands, visitsData, topProducts };
  } catch (error) {
    return { error: error.message || "Hubo un error al obtener los datos" };
  }
};

export default async function Home() {
  const data = await getData();
  console.log(data.visitsData);

  return (
    <>
      <Hero item={data.topProducts[0]} />
      <div className="mt-16 mb-10">
        <RelatedCarrousel
          relatedProducts={data.topProducts}
          text={"¡Alimentos mas vendidos!"}
        />
      </div>
      <section className="mt-8">
        <div className="flex flex-col gap-2 md:flex-row justify-evenly check items-center">
          <p>
            <Check />
            Envios a domicilio GRATIS*
          </p>
          <p>
            <Check />
            Los mejores precios
          </p>
          <p>
            <Check />
            Paga tu compra en tu domicilio
          </p>
        </div>
      </section>
      {/* <section className="mt-10 border border-x-0 border-y-green-300 border-y-[3px] p-4 relative pb-10">
        <SectionHeaders name={"Salud"} textColor={"text-green-500"}>
          En Domestic Pet tambien te cuidamos a vos. Por eso te ofrecemos los
          alimentos mas saludables y, lo mejor de todo, al mejor precio.
        </SectionHeaders>
        <SectionHomeDiet />
      </section> */}
      <section className="mt-16 border border-x-0 border-y-red-400 border-y-[3px] p-4 relative pb-10">
        <SectionHeaders name={"Marcas"} textColor={"text-red-400"}>
          Las marcas mas solicitadas por nuestros clientes
        </SectionHeaders>
        <SectionBrands brands={data.mainBrands} />
        <div className="flex">
          <Link
            href={"/brands"}
            className="mt-8 inline-block rounded mx-auto bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-white"
          >
            Ver marcas
          </Link>
        </div>
      </section>
      <InformationSection />
    </>
  );
}
