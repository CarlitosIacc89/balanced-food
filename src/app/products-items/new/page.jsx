"use client"
import { UseProfile } from '@/components/UseProfile'
import Left from '@/components/icons/Left'
import Right from '@/components/icons/Right'
import Loader from '@/components/layout/Loader'
import ProductForm from '@/components/layout/ProductForm'
import SuccessUser from '@/components/layout/SuccessUser'
import UserAdmin from '@/components/layout/UserAdmin'
import brands from '@/helpers/brands'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const NewProductPage = () => {
       const [brand, setBrand] = useState(null)
       const [create, setCreate] = useState(false)
       const [messageSuccess, setMessageSuccess] = useState("")
       const [createErrorText, setCreateErrorText] = useState(null)

     const {loading: profileloading, data: usersData} = UseProfile()

     const router = useRouter()

     
     useEffect(() =>{
         setBrand(brands())
        },[])
        
        if (usersData && typeof usersData.admin !== 'undefined' && !usersData.admin) {
        return router.push("/");
      }
       const handleSubmit = async (e, data) =>{
        e.preventDefault()

        try {
            const response  = await fetch("/api/products", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type" : "application/json"}
            })
            if(response.ok){
                const {data} = await response.json()
                setCreate(true)
                setMessageSuccess(data.message)

                setTimeout(() => {
                   setCreate(false)
                   router.push("/products-items") 
                }, 2000);
            }else{
                throw new Error(`Ups! Algo salio mal`)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <section className='mt-8  max-w-4xl mx-auto'>
        {profileloading && (
            <Loader/>
        )}
        {create && (
            <SuccessUser successText={create} setSuccessText={setCreate} text={messageSuccess}/>
        )}
        <UserAdmin/>
        <div className='my-8 flex hover:bg-gray-200'>
                <Link
                   className='new-product' 
                   href={"/products-items"}>
                       <Left/>
                   Volver a Productos
                </Link>
            </div>
        <ProductForm onSave={handleSubmit} {...{brand}}/>
    </section>
  )
}

export default NewProductPage