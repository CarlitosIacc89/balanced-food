"use client"
import Left from '@/components/icons/Left'
import BrandsForm from '@/components/layout/BrandsForm'
import SuccessUser from '@/components/layout/SuccessUser'
import UserAdmin from '@/components/layout/UserAdmin'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditPageBrands = ({params}) => {
    const [brands, setBrands] = useState(null)
    const [textResponse, setTextResponse] = useState("")
    const [edit, setEdit] = useState(false)

    const router = useRouter()

    const {id} = params

    useEffect(()=>{
        getBrand()
    },[])

    async function getBrand(){
          try {
        const res = await fetch(`/api/brands?id=${id}`)
        if(!res.ok){
            throw new Error("Hubo un error!")
        }
        const data = await res.json()
        setBrands(data)
    } catch (error) {
        return {error: error.message}
    }
    }

    const handleSubmit = async (e, data) => {
        e.preventDefault()

         data = {...data, _id:id}
        
        try {
            const res = await fetch(`/api/brands`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-Type" : "application/json"}
            })
            if(!res.ok){
                throw new Error("Ups! Hubo un error al editar la marca")
            }
            const text = await res.json()
            setTextResponse(text.data.message)
            setEdit(true)
            setTimeout(() => {
                setEdit(false)
                router.push("/brands-admin")
            }, 2000);

        } catch (error) {
            setTextResponse(error.message)
        }

    }


  return (
     <section className='mt-8  max-w-4xl mx-auto'>
        <UserAdmin/>
        {edit &&(
            <SuccessUser successText={edit} setSuccessText={setEdit} text={textResponse}/>
        )}
        <div className='my-8 flex hover:bg-gray-200'>
                <Link
                   className='new-product' 
                   href={"/brands-admin"}>
                   Volver a marcas
                   <Left/>
                </Link>
        </div>
        {brands && (
            <BrandsForm {...{brands, handleSubmit}}/>
        )}
     </section>
  )
}

export default EditPageBrands