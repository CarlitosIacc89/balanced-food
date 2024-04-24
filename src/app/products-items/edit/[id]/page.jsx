"use client"

import { UseProfile } from "@/components/UseProfile"
import Left from "@/components/icons/Left"
import ErrorUser from "@/components/layout/ErrorUser"
import Loader from "@/components/layout/Loader"
import ProductForm from "@/components/layout/ProductForm"
import SuccessUser from "@/components/layout/SuccessUser"
import UserAdmin from "@/components/layout/UserAdmin"
import brands from "@/helpers/brands"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const EditProductpage = ({params}) => {
    const {id} = params
    const [product, setProduct] = useState(null)
    const [brand, setBrand] = useState(null)
    const [edit, setEdit] = useState(false)
    const [editText, setEditText] = useState("")
    const [editTextError, setEditTextError] = useState("")

    const router = useRouter()

    const {loading: profileloading, data: usersData} = UseProfile()

    
    useEffect(()=>{
        setBrand(brands())
        fetch(`/api/products?id=${id}`)
        .then(res =>{
            res.json().then(data =>{setProduct(data)})
        })
    },[])
    
    if (usersData && typeof usersData.admin !== 'undefined' && !usersData.admin) {
     return router.push("/");
   }
    const handleSubmit = async (e, data) =>{
        e.preventDefault()

        data = {...data, _id:id}

        try {
            const response = await fetch(`/api/products`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
            if(response.ok){
                setEdit(true)
                const {data} = await response.json()
                setEditText(data.message)

                setTimeout(() => {
                    setEdit(false)
                    router.push("/products-items")
                }, 2000);
  
            } else{
                const errorData = await response.json()
                throw new Error(errorData.message || "Ups! Ocurrio un error")
            }
        } catch (error) {
           setEditTextError(error)
        }
    }
  return (
     <section className='mt-8  max-w-4xl mx-auto'>
        {profileloading && (
            <Loader/>
        )}
        {edit && (
            <SuccessUser successText={edit} setSuccessText={setEdit} text={editText}/>
        )}
        {editTextError && (
            <ErrorUser errorText={editText} setErrorText={setEditTextError}/>
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
        { product && <ProductForm onSave={handleSubmit} {...{product, brand}}/> }
    </section>
  )
}

export default EditProductpage