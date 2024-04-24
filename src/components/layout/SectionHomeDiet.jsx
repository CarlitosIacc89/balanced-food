
import React from 'react'
import ItemDiet from './ItemDiet';

const SectionHomeDiet = () => {
  return (
        <div className="mt-8 grid justify-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-8 sm:gap-4">
          <ItemDiet img={"/nueces.jpg"} product={"Nueces"}/>
          <ItemDiet img={"/almendras.jpg"} product={"Almendras"}/>
          <ItemDiet img={"/granolas.jpg"} product={"Granola"}/>
          <ItemDiet img={"/allFrutosSecos.avif"} product={"Ver todos"}/>
        </div>
  )
}

export default SectionHomeDiet

//absolute w-full opacity-0 bg-black text-white bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-70 transition-opacity duration-300