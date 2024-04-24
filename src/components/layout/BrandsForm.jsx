"use client"
import React, { useState } from 'react'
import EditableImage from './EditableImage'
import { usePathname } from 'next/navigation'

const BrandsForm = ({brands, handleSubmit}) => {
    const [title, setTitle] = useState(brands?.title || "")
    const [image, setImage] = useState(brands?.image || "")

    const path = usePathname()


  return (
     <form className='mt-8 max-w-md mx-auto'
           onSubmit={(e) => handleSubmit(e, {
            title, 
            image
           })}>
        <div className='flex flex-col'>
            <div className='mx-auto text-center mb-3'>
                 <EditableImage link={image} setLink={setImage}/>
            </div>
            <label>Nombre de la marca</label>
            <input type="text" placeholder='Marca' value={title} 
                   onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <button type='submit' className='bg-blue-500 mx-auto'>
          {path.includes("edit") ? "Editar" : "Crear"}
        </button>
    </form>
  )
}

export default BrandsForm