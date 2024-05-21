import Hero from "@/components/layout/Hero";

import SectionHeaders from "@/components/layout/SectionHeaders";
import Link from "next/link";
import SectionBrands from "@/components/layout/SectionBrands";
import RelatedCarrousel from "@/components/layout/RelatedCarrousel";
import InformationSection from "@/components/layout/InformationSection";

// const getData = async () => {
//   try {
//     let productsApi = `http://localhost:3000/api/products`,
//       brandsApi = `http://localhost:3000/api/brands`,
//       visitsApi = `http://localhost:3000/api/visits`,
//       productsFetch = fetch(productsApi, { cache: "no-store" }),
//       brandsFetch = fetch(brandsApi, { cache: "no-store" }),
//       visitsFetch = fetch(visitsApi, { cache: "no-store" }),
//       [productsRes, brandsRes, visitsRes] = await Promise.all([
//         productsFetch,
//         brandsFetch,
//         visitsFetch,
//       ]);

//     if (!productsRes.ok) {
//       throw new Error("Hubo un error al obtener los productos");
//     }
//     if (!brandsRes.ok) {
//       throw new Error("Hubo un error al obtener las marcas");
//     }

//     const productsData = await productsRes.json();
//     const brandsData = await brandsRes.json();
//     const visitsData = await visitsRes.json();

//     let mainBrands;
//     if (brandsData) {
//       mainBrands = brandsData?.brands.slice(0, 6);
//     }

//     let mainProducts;
//     if (productsData) {
//       mainProducts = productsData?.sort((a, b) => b.sales - a.sales);
//     }

//     let topProducts;
//     if (mainProducts) {
//       topProducts = mainProducts?.slice(0, 7);
//     }

//     return { productsData, brandsData, mainBrands, visitsData, topProducts };
//   } catch (error) {
//     return { error: error?.message || "Hubo un error al obtener los datos" };
//   }
// };

const getData = async () => {
  try {
    let productsApi = `https://balanced-food-soria-iacc-hotmailcom-carlos-projects-5e31a4ed.vercel.app/api/products`,
      brandsApi = `https://balanced-food-soria-iacc-hotmailcom-carlos-projects-5e31a4ed.vercel.app/api/brands`,
      visitsApi = `https://balanced-food-soria-iacc-hotmailcom-carlos-projects-5e31a4ed.vercel.app/api/visits`,
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

    let mainBrands;
    if (brandsData) {
      mainBrands = brandsData?.brands.slice(0, 6);
    }

    let mainProducts;
    if (productsData) {
      mainProducts = productsData?.sort((a, b) => b.sales - a.sales);
    }

    let topProducts;
    if (mainProducts) {
      topProducts = mainProducts?.slice(0, 7);
    }

    return { productsData, brandsData, mainBrands, topProducts };
  } catch (error) {
    return { error: error?.message || "Hubo un error al obtener los datos" };
  }
};

export default async function Home() {
  const data = await getData();

  if (data?.error) {
    return <div>Error: {data.error}</div>;
  }

  if (!data || !data.topProducts || !data.topProducts.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Hero item={data?.topProducts[0]} />
      <div className="mt-16 mb-10">
        <RelatedCarrousel
          relatedProducts={data?.topProducts}
          text={"¡Alimentos mas vendidos!"}
        />
      </div>
      <section className="mt-16 border border-x-0 border-y-red-400 border-y-[3px] p-4 relative pb-10">
        <SectionHeaders name={"Marcas"} textColor={"text-red-400"}>
          Las marcas mas solicitadas por nuestros clientes
        </SectionHeaders>
        <SectionBrands brands={data?.mainBrands} />
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
