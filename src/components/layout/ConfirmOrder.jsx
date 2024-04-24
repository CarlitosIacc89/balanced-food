"use client"
import React, { useContext, useState } from 'react'
import Close from '../icons/Close'
import { CartContext } from '../Provider'

const ConfirmOrder = ({setPurchaseCompleted, purchaseCompleted, order, handleSubmit}) => {
    const {cartProducts} = useContext(CartContext)
    

  return (
        <div className='inset-0 fixed bg-black/80 flex items-center justify-center z-10'>
            <div className='flex flex-col w-80 lg:w-[50%] bg-white rounded-lg items-center'>
               <span className='self-end pt-2 px-2 cursor-pointer'
                   onClick={() => setPurchaseCompleted(!purchaseCompleted)}>
                   <Close className='w-7 h-7'/>
               </span>
               <h2 className='font-bold text-gray text-xl mb-4'>Revisá que esté todo bien</h2>
               {cartProducts?.map(pro => (
                <div key={pro._id} className='flex gap-4 text-sm font-bold text-gray-700'>
                    <div className='w-[195px]'>{pro.title} {pro.kilogram}Kg</div>
                    <div>{pro.cantidad}u</div>
                    <div>${pro.offer ? ((parseInt(pro.publicPrice) - ((pro.discount / 100) * parseInt(pro.publicPrice))) * pro.cantidad).toLocaleString("AR") : (parseInt(pro.publicPrice) * pro.cantidad).toLocaleString("AR")}</div>
                </div>
               ))}
               <div className='mt-4 text-center text-sm confirm'>
                  <div className='border-b-2'>
                    Recibe: <span>{order.personReiceves}</span>
                  </div>
                  <div className='grid grid-cols-2 text-center items-center border-b-2'>
                    <div className='ml-10'>
                        Direccion de entrega: <span>{order.deliveryAddress}</span>
                    </div>
                    <div>
                        N°: <span>{order.numberDeliveryAddress}</span>
                    </div>
                  </div>
                  <div className='border-b-2'>
                    Barrio: <span>{order.district}</span>
                  </div>
                  <div className='border-b-2'>
                    Telefono: <span>{order.phone}</span>
                  </div>
                  <div>
                    Nota para vendedor: <span>{order.noteToSeller}</span>
                  </div>
               </div>
              
                <div className='flex my-8 gap-4'>
                  <button type='button' className='bg-green-500 hover:bg-green-600 transition-all duration-300'
                          onClick={(e) => handleSubmit(e, order)}>
                   Confirmar
                  </button>
                  <button className='bg-red-500 hover:bg-red-600 transition-all duration-300'
                          onClick={() => setPurchaseCompleted(!purchaseCompleted)}>
                    Cancelar
                  </button>
                </div>
            </div>
         </div>
  )
}

export default ConfirmOrder