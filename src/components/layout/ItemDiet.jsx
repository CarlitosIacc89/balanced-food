"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Eye from '../icons/Eye';

const ItemDiet = ({img, product}) => {
    const [isHovered, setIsHovered] = useState(false);
  return (
          <div className="grid-item group">
            <Image src={img} width={200} height={200} alt="" />
            <button className={`absolute w-full opacity-0 p-2 text-[17px] font-semibold bg-black text-white -bottom-[11%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  transition-opacity duration-300 ${isHovered ? "group-hover:opacity-100" : "group-hover:opacity-70" }`}
                    onMouseEnter={() =>setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                <span className='flex items-center justify-center gap-4'>
                    <Eye/>
                   {product}
                </span>
            </button>
          </div>
  )
}

export default ItemDiet