import InformationSection from '@/components/layout/InformationSection'
import ProductItem from '@/components/layout/ProductItem'
import Image from 'next/image'
import React from 'react'

async function getData(id){
    try {
        const res = await fetch(`http://localhost:3000/api/brands?brand=${id}`, {cache:"no-store"})
        if(!res.ok){
            throw Error("Hubo un error al obtener los productos")
        }
        const data = await res.json()
        
        return data
    } catch (error) {
        return {error: error.message}
    }
}

const PageSingleBrands = async ({params}) => {
    const id = params.id
    const decodedString = decodeURIComponent(id);
    const items = await getData(id)

  return (
    <section className='mt-8'>
        <h1 className='text-4xl font-bold text-center'>{decodedString}</h1>
         <div className='grid gap-4 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 mt-12 '>
            {items.length > 0 ? items.map(item =>(
            
                <ProductItem key={item._id} item={item}/>
                
            )):  <div className='w-full col-span-full text-center mb-10 text-white'>
                    {/* <Image className='mx-auto' src={"/Loader.gif"} width={100} height={100} alt=''/> */}
                    <span className='bg-red-400 font-bold py-2 px-4 rounded-md'>No hay productos de la marca</span>
                </div>}
        </div>
        <InformationSection/>
    </section>
  )
}

export default PageSingleBrands