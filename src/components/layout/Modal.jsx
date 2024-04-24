"use client"

import React, { useEffect } from 'react'
import Close from '../icons/Close'
import Caution from '../icons/Caution'
import { useRouter } from 'next/navigation'

const Modal = ({setShowPopUp, showPopUp}) => {

    const router = useRouter()
  return (
     <div className='inset-0 fixed bg-black/80 flex items-center justify-center z-10'>
       <div className='flex flex-col w-80 lg:w-96 bg-white rounded-lg  items-center'>
        <span className='self-end pt-2 px-2 cursor-pointer'
              onClick={(e) => {
                e.preventDefault()
                setShowPopUp(!showPopUp)
                }}>
            <Close className='w-7 h-7'/>
        </span>
        <Caution className="w-14 h-14"/>
        <p className='p-4 font-semibold text-gray-500'>Debes iniciar sesion o registrarte para comenzar a comprar</p>
        <div className='flex p-0 mb-4 '>
            <button type='button' className='underline text-gray-700 font-bold'
                    onClick={(e) => {
                        e.preventDefault()
                        router.push("/login")
                        setShowPopUp(!showPopUp)
                        }}>
                Inicia sesion
            </button>
            <button type='button' className='underline text-gray-700 font-bold'
                    onClick={(e) => {
                        e.preventDefault()
                        setShowPopUp(!showPopUp)
                        router.push("/register")
                        }}>
                Registrate
            </button>
        </div>
       </div>
     </div>
  )
}

export default Modal