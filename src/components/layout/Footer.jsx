"use client"
import { Salsa } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const salsa = Salsa({subsets: ["latin"],  weight: ["400"]})


const Footer = () => {
   const router = useRouter()
  return (
    <footer className='flex flex-col pt-4 gap-2 lg:gap-0 lg:pt-0 flex-wrap lg:flex-row h-64 md:h-48 lg:h-32 bg-gray-200 items-center justify-around'>
       <div className='flex gap-4'>
          <Link href={"https://www.facebook.com/profile.php?id=100064321023494"} target='_blank' className='w-8 h-8 bg-blue-800 text-center pt-[1px] rounded-md text-white'>
              <i className="fa-brands fa-facebook text-3xl"></i>
          </Link>
          <div className='insta w-8 h-8 relative'>
             <span></span>
          </div>
          <div className='w-8 h-8 bg-green-400 text-center rounded-md text-white'>
             <i className="fa-brands fa-whatsapp text-3xl"></i>
          </div>
       </div>
       <div className='flex flex-col md:flex-row gap-2 items-center font-bold'>
          <Image className=' w-16 transition-all duration-300 lg:w-24 rounded-full' src={"/DomesticPet.jpg"} width={50} height={50} alt='logo'/>
          <span className={`${salsa.className}  text-lg text-gray-900 md:text-2xl `}>Domestic Pet</span>
       </div>
       <div className='px-4 text-center'>
        <p className='font-bold'>Siempre brindando el mejor servicios para sus mascotas. </p>
        <p className='font-bold'>Cordoba, Argentina &copy; 2024</p>
       </div>
    </footer>
  )
}

export default Footer