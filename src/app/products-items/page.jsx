"use client"
import { UseProfile } from '@/components/UseProfile'
import Right from '@/components/icons/Right'
import Trash from '@/components/icons/Trash'
import EditableImage from '@/components/layout/EditableImage'
import Loader from '@/components/layout/Loader'
import ProductForm from '@/components/layout/ProductForm'
import UserAdmin from '@/components/layout/UserAdmin'
import brands from '@/helpers/brands'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProductsItemsPage = () => {
    const [product, setProduct] = useState(null)
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [brand, setBrand] = useState(null)

    const {loading: profileloading, data: usersData} = UseProfile()

    const router = useRouter()

    useEffect(() =>{
        setBrand(brands())
        fetch("/api/products")
        .then(res =>{
            res.json().then(data => setProduct(data))
        })
    },[])
     if (usersData && typeof usersData.admin !== 'undefined' && !usersData.admin) {
     return router.push("/");
   }
   
   console.log(product)

   const sortProducts = () =>{
       switch(sortBy){
        case "Alphabetical":
            return [...product].sort((a,b)=> a.title.localeCompare(b.title));
        case "Price":
            return [...product].sort((a,b) => b.basePrice - a.basePrice);
        case "Sale":
            return [...product].sort((a,b) => b.sales - a.sales);
        case "Stock":
            return [...product].sort((a,b) => b.quantity - a.quantity)
        default: 
            return product
       }
   }

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`/api/products?id=${id}`, {
                method: "DELETE"
            })
            if(response.ok){
                console.log(await response.json())
            }else{
                throw new Error("Ups! Ocurrio un error")
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
        <UserAdmin/>
            <div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-2 w-full mt-10'>
                <div className='flex items-center gap-4'>
                    <span className='text-slate-600 font-bold'>Ordenar por: </span>
                     <select className='w-40 m-0 text-sm' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="Alphabetical">Alfabeticamente</option>
                        <option value="Sale">Numero de ventas</option>
                        <option value="Stock">Stock</option>
                        <option value="Price">Precio</option>
                     </select>
                </div>
                <Link className="border py-2 px-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md text-sm"  href={"/products-items/new"}>
                   + Add Product
                </Link>
            </div>

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Titulo</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Stock</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ventas</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Precio base</th>
                        <th className="px-4 py-2"></th>
                     </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                         {product && sortProducts().map(pro => (
                            <tr key={pro._id} className='text-center'>
                               <td className="whitespace-nowrap flex gap-4 items-center min-w-72 px-4 py-2 font-medium text-gray-900">
                                 <div>
                                    <Image src={pro.image} width={32} height={32} alt='imagen'/>
                                 </div>
                                  {pro.title}
                               </td>
                               <td className="whitespace-nowrap px-4 py-2 text-gray-700">{pro.quantity}</td>
                               <td className="whitespace-nowrap px-4 py-2 text-gray-700">{pro.sales}</td>
                               <td className="whitespace-nowrap px-4 py-2 text-gray-700">${pro.basePrice.toLocaleString("AR")}</td>
                               <td className="whitespace-nowrap px-4 py-2 space-x-1">
                                   <Link
                                      href={`/products-items/edit/${pro._id}`}
                                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                   >
                                       Edit
                                   </Link>
                                   <button
                                      type='button'
                                      className="inline-block rounded bg-red-400 px-4 py-2 text-xs font-medium text-white hover:bg-red-500"
                                      onClick={()=> handleDelete(pro._id)}
                                   >
                                       Eliminar
                                   </button>
                                </td>
                            </tr>
                             ))}
                     </tbody>
                </table>
           </div>
    </section>
  )
}

export default ProductsItemsPage