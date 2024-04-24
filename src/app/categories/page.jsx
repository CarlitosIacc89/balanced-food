"use client"
import Loader from '@/components/layout/Loader'
import UserAdmin from '@/components/layout/UserAdmin'
import { UseProfile } from "../../components/UseProfile"
import React, { useEffect, useState } from 'react'
import Category from '@/components/layout/Category'

const CategoriesPage = () => {
    const [categoryName, setCategoryName] = useState("")
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(null)
    const [success, setSuccess] = useState(false)


    const {loading: profileloading, data: usersData} = UseProfile()

    useEffect(() =>{
      fetchCategories()
    },[])

    if (usersData && typeof usersData.admin !== 'undefined' && !usersData.admin) {
     return router.push("/");
   }

    const fetchCategories = () =>{
         fetch("/api/categories").then(res =>{
        if(!res.ok){
            throw new Error (`Error en la solicitud: ${res.status} ${res.statusText}`)
        } return res.json()
       }).then(data =>{
        setCategories(data)
       }).catch(error =>{
        console.log(error)
       })
    }

    const handleNewCategory = async (e) =>{
        e.preventDefault()
        try {
            const data = {name: categoryName}
            if(editedCategory){
                data._id = editedCategory._id
            }
            const response = await fetch("/api/categories", {
                method: editedCategory ? "PUT" : "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
            fetchCategories()
            setCategoryName("")
            setEditedCategory(null)
            if(response.ok){
                 setSuccess(true)
                 setTimeout(() => {
                    setSuccess(false)
                 },2000);
                console.log(response)
            } else{
                throw new Error("Ups! Algo salio mal")
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleDeleteCategory = async (id) =>{
        try {
            const response = await fetch("/api/categories", {
                method: "DELETE",
                body: JSON.stringify(id)
            })
            if(response.ok){
                console.log("borrado")
            }else{
                console.log("error")
            }
            fetchCategories()
        } catch (error) {
            
        }
    }

  return (
    <section className='mt-8  max-w-4xl mx-auto'>
        {profileloading && (
            <Loader/>
        )}
        <UserAdmin/>
        <form className='mt-8 max-w-lg mx-auto' onSubmit={handleNewCategory}>
            <div className="flex flex-col sm:flex-row gap-2 items-end justify-center">
                <div className='grow mx-auto text-center sm:text-left'>
                    <label>{editedCategory ? "Editar categoria" : "Nombre nueva categoria"}</label>
                    <input type="text"  value={categoryName}
                           onChange={(e) => setCategoryName(e.target.value)} />
                </div>
                <div className='pb-2 mx-auto'>
                    <button className=' bg-green-400 text-white'>
                        { editedCategory ? "Editar" : "Crear"}
                    </button>
                </div>
            </div>
            {success && (
                <div className={`w-80 mt-4 bg-green-400 font-bold text-white p-4 mx-auto text-center rounded-md`}>
                    Categoria creada
                </div>
            )}
        </form>
        <h2 className='mt-8 mb-6 text-lg text-center text-gray-400 font-bold'>
            {categories.length > 0 ? "Tus categorias" : "No hay categorias"}
        </h2>
        {categories?.length > 0 && categories.map(cat =>(
            <Category key={cat._id} {...{cat, setCategoryName, setEditedCategory, handleDeleteCategory}}/>
        ))}
    </section>
  )
}

export default CategoriesPage