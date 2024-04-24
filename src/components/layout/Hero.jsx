
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductItem from './ProductItem'

const Hero = ({item}) => {

  return (
    <section className='mt-8'>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-gradient-to-t from-white to-black rounded-md">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative w-full h-full overflow-hidden rounded-lg py-4  lg:h-full bg-gradient-to-r from-black to-blue-950">
            <ProductItem {...{item}} />
          </div>

          <div className="lg:py-24 text-white">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Nuestra oferta de la semana 📣​
            </h1>

            <p className="mt-4 font-semibold ">
              En Domestic Pet todos los días tenemos ofertas exclusivas para ti
              y tu mascota. Encuentra los mejores productos para el cuidado y la
              alimentación de tus fieles compañeros. No te pierdas estas
              oportunidades únicas.
            </p>

            <Link
              href={"/offers"}
              className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-white"
            >
              Ver todas las ofertas
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-xl ">
          <div className="min-w-[40%]">
            <Image
              className="w-full h-full object-cover"
              src={"/necesidades_especificas.jpg"}
              width={250}
              height={250}
              alt="image"
            />
          </div>
          <div className="text-center  px-4">
            <h2 className="text-2xl text-slate-700 font-bold">
              Necesidades Especificas
            </h2>
            <p className="font-semibold text-slate-700 text-sm mt-4 min-h-[100px]">
              Ofrecemos alimentos especializados para mascotas con necesidades
              específicas. Fórmulas para piel sensible, alimentos light y dietas
              gastrointestinales, etc.
            </p>
            <div className="space-x-4">
              <Link
                href={"/products/dog/specific"}
                className="mt-4 inline-block rounded bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-white"
              >
                Perros
              </Link>
              <Link
                href={"/products/cat/specific"}
                className="mt-4 inline-block rounded bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-white"
              >
                Gatos
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-xl">
          <div className="min-w-[40%]">
            <Image
              className="w-full h-full object-cover"
              src={"/kilogramos-regalo.jpg"}
              width={250}
              height={250}
              alt="image"
            />
          </div>
          <div className="text-center  px-4">
            <h2 className="text-2xl text-slate-700 font-bold">
              Alimentos con kg de regalo
            </h2>
            <p className="font-semibold text-slate-700 text-sm mt-4">
              Aprovecha nuestras promociones con kilogramos adicionales de
              regalo! Consigue alimentos para mascotas con más cantidad sin
              costo extra y mantén a tu mascota feliz y satisfecho
            </p>
            <Link
              href={"/kgs-de-regalo"}
              className="mt-4 inline-block rounded bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-white"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default Hero