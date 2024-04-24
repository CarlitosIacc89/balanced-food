"use client"
import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import Image from 'next/image'
import useSortAndFilter from '../useSortAndFilter'
import SortAndFilter from './SortAndFilter'

const SectionProducts = ({items}) => {
    //Uso de un hook personalizado para el filtrado y ordenado de los productos
    const {sortBy, setSortBy, filter, setFilter, filteredItems} = useSortAndFilter(items)

  return (
    <>
         <SortAndFilter {...{sortBy, setSortBy, filter, setFilter}}/>
        <p className='font-bold text-gray-600 text-center'>{filteredItems.length} articulos encontrados</p>
        <div className='grid gap-4 gap-y-10 grid-cols-1 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 mt-12 bg-gradient-to-t from-gray-600 to-white pb-4'>
            {items.length > 0 ? filteredItems.map(item =>(                
                <ProductItem key={item._id} item={item}/>                
            )):  <div className='w-full col-span-full'>
                    <Image className='mx-auto' src={"/Loader.gif"} width={100} height={100} alt=''/>
                </div>}
        </div>
    </>  
  )
}

export default SectionProducts

