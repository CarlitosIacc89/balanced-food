"use client"

import React, { useState } from 'react'
import EditableImage from './EditableImage'
import UserAdmin from './UserAdmin'

const UserForm = ({user, onSave, admin}) => {
 
    const [name, setName] = useState(user?.name || "")
    const [lastName, setLastName] = useState(user?.lastName || "")
    const [email, setEmail] = useState(user?.email || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [image, setImage] = useState(user?.image|| "")
    const [address, setAddress] = useState(user?.address || "")
    const [numberAddress, setNumberAddress] = useState(user?.numberAddress || "")
    const [city, setCity] = useState(user?.city || "")
    const [postalCode, setPostalCode] = useState(user?.postalCode || "")

  return (
    <>  
        {admin && (
            <UserAdmin/>
        ) }
        <form className='mt-8 max-w-md mx-auto bg-white p-6 rounded-xl' 
              onSubmit={(e) =>
                onSave(e, {
                    name,
                        lastName,
                        email,
                        phone,
                        image,
                        address,
                        numberAddress,
                        city,
                        postalCode
                       })}>
            <div className='flex flex-col'>
                <div className='mx-auto text-center mb-3'>
                   <EditableImage link={image} setLink={setImage}/>
                </div>
                <label>Nombre</label>
                <input type="text" name='name' value={name}  
                       onChange={(e)=> setName(e.target.value)} />

                <label>Apellido</label>
                <input type="text" name='lastName' value={lastName}
                       onChange={e => setLastName(e.target.value)} />

                <label>Correo</label>
                <input type="text" name='email' 
                       value={email} disabled   
                       onChange={e => setEmail(e.target.value)} />

                <label>Telefono</label>
                <input type="tel" name='phone' value={phone}
                       onChange={e => setPhone(e.target.value)} />

               <div className='lg:grid lg:grid-cols-2 gap-4'>
                    <div className='lg:w-full'>
                       <label>Direccion</label>
                       <input type="text" name='address' value={address}
                              onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className=' w-48 lg:w-28 lg:ml-auto'>
                        <label>N°</label>
                        <input type="text" name='numberAddress' value={numberAddress}
                               onChange={e => setNumberAddress(e.target.value)} />
                    </div>
                </div>
                <div className='lg:grid lg:grid-cols-2 gap-4'>
                    <div>
                       <label>Ciudad</label>
                       <input type="text" name='city' value={city}
                              onChange={e => setCity(e.target.value)} />
                    </div>
                    <div>
                        <label>Codigo Postal</label>
                        <input type="text" name='postalCode' value={postalCode}
                               onChange={e => setPostalCode(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-8 mt-2'>
                <button type='submit' className='border text-white bg-green-500 rounded-[4px]'>Guardar</button>
            </div>
        </form>
    </>
  )
}

export default UserForm