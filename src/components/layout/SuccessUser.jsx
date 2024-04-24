"use client"
import React, { useEffect, useState } from 'react'
import Close from '../icons/Close'
import Check from '../icons/Check'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SuccessUser = ({successText, setSuccessText, text}) => {
    const [pathLogin, setPathLogin] = useState(true)
    const path = usePathname()

    useEffect(()=>{
        if(!path.includes("login")){
            setPathLogin(false)
        }
    },[path])

  return (
    <div className='inset-0 fixed bg-black/80 flex items-center justify-center z-10'>
       <div className='flex flex-col w-80 lg:w-96 bg-white rounded-lg  items-center'>
        <span className='self-end pt-2 px-2 cursor-pointer'
              onClick={() => setSuccessText(!successText)}>
            <Close className='w-7 h-7'/>
        </span>
        <p className={`flex flex-col gap-4 items-center text-xl text-gray-500 font-bold mb-8`}>
            {text}
            <Check color='text-green-400' className='w-14 h-14'/>
            
            {pathLogin && (
                <Link href={"/login"} onClick={() => setSuccessText(!successText)} className='underline text-[17px]'>Iniciar sesion</Link>
            )}
        </p>
       </div>
    </div>
  )
}

export default SuccessUser