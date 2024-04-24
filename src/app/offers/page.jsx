

import InformationSection from '@/components/layout/InformationSection'
import Loader from '@/components/layout/Loader'
import ProductItem from '@/components/layout/ProductItem'
import SectionHeaderFood from '@/components/layout/SectionHeaderFood'
import SectionProducts from '@/components/layout/SectionProducts'
import Image from 'next/image'
import React from 'react'

async function getData(){
    try {
        const res = await fetch(`http://localhost:3000/api/products?offer=true`, {cache:"no-store"})
        if(!res.ok){
            throw Error("Hubo un error al obtener los productos")
        }
        const data = await res.json()
        // const offers = data.filter(pro => pro.offer === true)
        return data
    } catch (error) {
        return {error: error.message}
    }
}

const OffersPage = async () => {
    const items = await getData()

  return (
    <section className='mt-8'>
        <SectionHeaderFood img={"/sale.png"} items={items} text={"Alimentos en oferta!!"}/>
          {items.length > 0 ? (
          <SectionProducts items={items}/>
        ) : (
          <div className='w-full col-span-full'>
              <Image className='mx-auto' src={"/Loader.gif"} width={100} height={100} alt=''/>
          </div>
        )}
        <InformationSection/>
    </section>
  )
}

export default OffersPage