"use client"
import { UseProfile } from '@/components/UseProfile'
import Left from '@/components/icons/Left'
import Loader from '@/components/layout/Loader'
import UserAdmin from '@/components/layout/UserAdmin'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Check from '@/components/icons/Check'
import Close from '@/components/icons/Close'
import UserBillingChart from '@/components/analitycs/UserBillingChart'

const ViewUserPage = ({params}) => {
    const [user, setUser] = useState(null)

    const {loading: userLoading, data: userData} = UseProfile()

    const array = []
    // const totalPurchase = user?.purchasesMade.reduce((total, purchase) =>
    //     total + purchase.total, 0)

     const totalPurchase = user?.purchasesMade ? user.purchasesMade.reduce((total, purchase) =>
        total + purchase.total, 0) : 0

    useEffect(()=>{
        fetch(`/api/users?id=${params.id}`)
        .then(res =>{
            res.json()
            .then(data => setUser(data))
        })
        .catch(error => console.log(error))
    },[params.id])

    if (userData && typeof userData.admin !== 'undefined' && !userData.admin) {
     return router.push("/");
   }

  return (
    <section className='mt-8  max-w-4xl mx-auto'>
        {userLoading && (
            <Loader/>
        )}
        <UserAdmin/>
        <div className='my-8 flex hover:bg-gray-200'>
                <Link
                   className='new-product' 
                   href={"/users"}>
                       <Left/>
                   Volver a {"usuarios"}
                </Link>
        </div>
        {user && (
            <div className='flex flex-col'>
                <div className='flex flex-col md:flex-row gap-2 text-center text-white bg-gray-900 p-8 rounded-lg font-bold'>
                  <div className='flex flex-col w-full md:w-[50%] gap-2'>
                    <div className=''>
                        <Image className='rounded-full mx-auto' src={user.image || "/NoProfile.webp" } width={100} height={100} alt='profile'/>
                    </div>
                    <div className='text-center font-extrabold'>
                        {user.name}{" "}{user.lastName}
                    </div>
                    <div className='border border-white w-44 mx-auto'></div>
                    <div>
                        <span className=''>Email: {user.email.toUpperCase()}</span>
                    </div>
                    <div>
                        <span>Direccion: </span>
                        <span>{user.address ? user.address.toUpperCase() :  "SIN DATOS"}{" "} N°: {user.numberAddress}</span>
                    </div>
                    <div>
                        <span>Ciudad: {user.city ? user.city.toUpperCase() : "SIN DATOS"}</span>
                    </div>
                    <div>
                        <span>CP: {user.postalCode || "SIN DATOS"}</span>
                    </div>
                    <div>
                        <span>Telefono: {user.phone ||"SIN DATOS"}</span>
                    </div>
                    <div>
                        <span className='flex gap-2 justify-center items-center'>Administrador: {user.admin ? <Check color='text-green-400'/> : <Close/>}</span>
                    </div>
                  </div>
                  <div className='grow'>
                    <div className='flex flex-col justify-around h-full items-center gap-4 mt-8 md:mt-0'>
                       <div className='bg-green-400 flex flex-col min-w-40 h-24 gap-2 px-2 justify-center text-center rounded-xl'>
                              <span className='font-bold'>Ordenes realizadas</span>
                              <span className='font-extrabold text-3xl'>{user.purchasesMade ? user.purchasesMade.length : 0}</span>
                       </div>
                       <div className='bg-red-400 flex flex-col min-w-40 h-24 gap-2 px-2 justify-center text-center rounded-xl'>
                              <span className='font-bold'>Facturacion total</span>
                              <span className='font-extrabold text-3xl'>${Math.round(totalPurchase).toLocaleString("AR")}</span>
                       </div>
                    </div>
                  </div>
                </div>
                <div className='grow'>
                    <div className='w-full h-full mx-auto my-auto px-6'>
                        <h2 className='text-xl font-bold text-center mt-16'>Facturacion por mes del usuario</h2>
                        <UserBillingChart purchaseMade={user.purchasesMade ? user.purchasesMade : array}/>
                    </div>
                </div>
            </div>
        )}
    </section>
  )
}

export default ViewUserPage