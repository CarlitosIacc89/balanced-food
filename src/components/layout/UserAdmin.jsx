"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const UserAdmin = () => {


    const path = usePathname()
  return (
     <div className='my-8 min-w-max lg:max-w-lg md:max-w-lg sm:max-w-lg mx-auto'>
               <fieldset className='border text-center bg-gray-50 md:px-4 rounded-xl mx-auto'>
                   <legend className='text-xl bg-gray-50 font-bold text-red-400 p-2 px-4 rounded-xl'>Opciones administrador</legend>
                  <div className='flex flex-col lg:flex-row md:flex-row sm:flex-row justify-center items-center gap-4 my-4 admin'>
                      <Link className={path.includes("profile") ? "active" : ""} href={"/profile"}>Perfil</Link>
                      <Link className={path.includes("users") ? "active" : ""} href={"/users"}>Usuarios</Link>
                      <Link className={path.includes("products-items") ? "active" : ""} href={"/products-items"}>Productos</Link>
                      <Link className={path.includes("brands") ? "active" : ""} href={"/brands-admin"}>Marcas</Link>
                      <Link className={path.includes("orders") ? "active" : ""} href={"/orders"}>Pedidos</Link>
                      <Link className={path.includes("analytics") ? "active" : ""} href={"/analytics"}>Analiticas</Link>
                  </div>
               </fieldset>
            </div>
  )
}

export default UserAdmin