"use client"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const SectionHeaderFood = ({img, text, items}) => {

  const path = usePathname()
  return (
    <>
     <p className='font-bold text-xl text-gray-500 mb-6'>{path}</p>
     <div className='relative'>
             <Image src={img} className='w-full max-h-[355px] object-cover rounded-md' width={1280} height={250} alt='img'/>
     </div>
      <div className=' bg-white w-[60%] lg:w-[80%]  rounded-md text-center mx-auto my-8'>
          <p className='text-sm md:text-2xl sm:text-xl lg:text-4xl p-2 font-bold text-blue-950'>{text}</p>
      </div>
    </>
  )
}

export default SectionHeaderFood