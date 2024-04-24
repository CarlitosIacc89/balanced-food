"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProductSearch = ({product, setSearch}) => {

    const router = useRouter()

  return (
     <div className='flex items-center mb-4 sm:m-0 hover:bg-gray-200 cursor-pointer'
                     onClick={() => {
                        router.push(`/products/${product.specie}/${product._id}`)
                        setSearch("")
                        } }>
                  <div className='flex justify-between items-center gap-2 md:gap-4 ml-2 md:ml-4'>
                       <div className='w-[40px]'>
                           <Image src={product.image} width={40} height={40} alt='img'/>
                       </div>
                       <div className='text-sm font-bold text-gray-500 text-start min-w-[170px]'>
                           {product.title} {product.kilogram}Kg
                       </div>
                  </div>
                  <div className='grow text-end'>
                    {/* <div className='mr-2 text-red-500 font-semibold text-sm'>
                        ${parseInt(product.price).toLocaleString("AR")}
                    </div> */}
                    {product.offer ? (

                            <div className='flex flex-col md:flex-row md:gap-2 items-center justify-end mr-2'>
                               <p className=' text-sm self-end text-gray-500 font-bold'><del>${parseInt(product.price).toLocaleString("AR")}</del></p>
                               <p className=' font-bold self-end text-red-500'>${(parseInt(product.price) - ((product.discount / 100) * parseInt(product.price))).toLocaleString("AR")}</p>
                            </div>
                        
                        ) : (
                          <p className=' mr-2 text-red-500 font-semibold text-sm'>${parseInt(product.price).toLocaleString("en")}</p>
                          )}
                  </div>
     </div>
  )
}

export default ProductSearch