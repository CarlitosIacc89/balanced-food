"use client"
import Error from '@/components/icons/Error'
import Left from '@/components/icons/Left'
import BrandsForm from '@/components/layout/BrandsForm'
import ErrorUser from '@/components/layout/ErrorUser'
import SuccessUser from '@/components/layout/SuccessUser'
import UserAdmin from '@/components/layout/UserAdmin'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const NewBrandsPage = () => {
    const [messageSuccess, setMessageSuccess] = useState("")
    const [create, setCreate] = useState(false)
    const [errorText, setErrorText] = useState(false)

    const router = useRouter()
    
    const handleSubmit = (e, data) => {
        e.preventDefault()
        
        fetch(`/api/brands`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            if(!res.ok){
                throw new Error("Ups! Ocurrio un error!")
            }
            res.json().then(data => {
                setMessageSuccess(data.data.message)
                setCreate(true)

                setTimeout(() => {
                    setMessageSuccess("")
                    setCreate(false)
                    router.push("/brands-admin")
                }, 2000);
            })
        }).catch(error => setErrorText(error.message))
    }


  return (
     <section className='mt-8  max-w-4xl mx-auto'>
        {create && (
            <SuccessUser successText={create} setSuccessText={setCreate} text={messageSuccess}/>
        )}
        {errorText &&(
            <ErrorUser {...{errorText, setErrorText}}/>
        )}
         <UserAdmin/>
            <div className='my-8 flex hover:bg-gray-200'>
                <Link
                   className='new-product' 
                   href={"/brands-admin"}>
                   Volver a marcas
                   <Left/>
                </Link>
            </div>
           <BrandsForm {...{handleSubmit}}/>
    </section>
  )
}

export default NewBrandsPage