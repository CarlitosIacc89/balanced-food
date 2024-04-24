"use client"
import Image from 'next/image'
import React from 'react'

const EditableImage = ({link, setLink}) => {

    const handleFileChange = async (e) =>{
        const files = e.target.files

        if(files?.length === 1){
            const data = new FormData
            data.set("file", files[0])

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: data,
                })

                if(response.ok){
                    setLink(await response.json())
                    return
                }
                throw new Error("Algo salio mal")
            } catch (error) {
                console.log(error)
            }
        }
    }
  return (
    <>
       <Image className='rounded-md object-cover max-w-[120px] max-h-[150px]' src={link || "/sinImagenDefault.jpg"} width={150} height={150} alt=''/>
       <label>
            <input type="file" className='hidden'onChange={handleFileChange} />
            <span className='block border p-1 text-sm rounded-md mt-3 bg-gray-100 cursor-pointer select-none hover:bg-gray-200'>Editar</span>
       </label>
    </>
  )
}

export default EditableImage