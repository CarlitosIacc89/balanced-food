"use client"
import { UseProfile } from '@/components/UseProfile'
import Caution from '@/components/icons/Caution'
import Close from '@/components/icons/Close'
import Trash from '@/components/icons/Trash'
import ErrorUser from '@/components/layout/ErrorUser'
import Loader from '@/components/layout/Loader'
import UserAdmin from '@/components/layout/UserAdmin'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const OrdersPage =  () => {
      const [orders, setOrders] = useState([])
      const [errorOrders, setErrorOrders] = useState(false)
      const [text, setText] = useState(null)
      const [loader, setLoader] = useState(true)
      const [deleteConfirm, setDeleteConfirm] = useState(false)
      const [deleteOrder, setDeleteOrder] = useState(null)

      const {loading: userLoading, data: usersData} = UseProfile()
      const router = useRouter()
     
      useEffect(()=>{
        getOrders()
        },[])

        function getOrders(){
             setLoader(true)
          fetch(`/api/orders`)
          .then(res =>{
              res.json()
              .then(order => {
                  setOrders(order)
                  setLoader(false)
                })
            })
            .catch(error =>{
                setErrorOrders(true)
                setErrorText(error)
            })
        }
        
        if (usersData && typeof usersData.admin !== 'undefined' && !usersData.admin) {
       return router.push("/");
     }
        
        const formatter = new Intl.NumberFormat("es-AR", {
            style: "currency",
    currency: "ARS"
})

const handleDeleteOrder = async (id) => {
    try {
        const res = await fetch(`/api/orders?id=${id}`, {method: "DELETE"})
        if(res.ok) {
            getOrders()
            return console.log(await res.json())
        }
        throw new Error("Ocurrio un error al eliminar la orden")
    } catch (error) {
        setErrorOrders(true)
        setText(error.message)

        setTimeout(() => {
            setErrorOrders(false)
        }, 3000);
    }
}
  return (
    <section className='mt-8 min-h-[46vh]'>
        <UserAdmin/>
       <h1 className='text-3xl font-bold text-red-500 text-center'>Ordenenes recibidas</h1>
       {errorOrders && (
        <ErrorUser errorText={text} setErrorText={setText}/>
       )}
       {loader && (
          <div className='w-full col-span-full'>
              <Image className='mx-auto' src={"/Loader.gif"} width={100} height={100} alt=''/>
         </div>
       )}
       {!loader && orders.length === 0 && (
        <div className='font-bold p-6 bg-gray-100 shadow-xl  border border-gray-300 text-center w-96 mx-auto rounded-lg mt-10'>
            <span className='text-blue-700'>NO HAY ORDENES RECIBIDAS</span>
        </div>
       )}
       {deleteConfirm && (
            <div className='inset-0 fixed bg-black/80 flex items-center justify-center z-10'>
       <div className='flex flex-col w-80 lg:w-96 bg-white rounded-lg  items-center'>
        <span className='self-end pt-2 px-2 cursor-pointer'
              onClick={() => setDeleteConfirm(false)}>
            <Close className='w-7 h-7'/>
        </span>
        <p className={`flex flex-col gap-4 items-center text-xl text-gray-500 font-bold mb-8`}>
            <Caution color='text-green-400' className='w-12 h-12'/>
            ¿Seguro deseas eliminar la orden?
        </p>
        <div className='flex gap-4 mb-8'>
            <button type='button' className='bg-green-400'
                    onClick={() => {
                        handleDeleteOrder(deleteOrder._id)
                        setTimeout(() => {
                            setDeleteConfirm(false)
                            setDeleteOrder(null)
                        }, 2000);
                    }}>
                SI
            </button>
            <button type='button' className='bg-red-400'
                    onClick={() => {
                        setDeleteConfirm(false)
                        setDeleteOrder(null)
                    }}>
                No
            </button>
        </div>
       </div>
    </div>
       )}
       {orders.length > 0  && orders.map(order =>(
          <div key={order._id} className='relative my-12 max-w-4xl mx-auto text-center confirm'>
            <fieldset className='border relative'>
                <legend className='text-sm sm:text-xl md:text-2xl font-bold text-green-400'>Orden id: {order._id}</legend>
                <div className='flex mt-4 gap-2 justify-evenly'>
                   <div>
                      Fecha:<span>{order.createdAt}</span>
                   </div>
                   <div>
                      Hora:<span>{order.hour}</span>
                   </div>
                </div>
                <div className='flex flex-col gap-2 md:flex-row md:gap-10 justify-center p-2'>
                   <div>
                       Cliente: <span className='font-bold text-gray-600'>{order.userClient.user}</span>
                   </div>
                   <div>
                       Recibe: <span>{order.personReiceves}</span>
                   </div>
                </div>
                <div className='flex gap-6 justify-center'>
                    <div>
                         Direccion: <span>{order.deliveryAddress}</span>
                    </div>
                    <div>
                        N°: <span>{order.numberDeliveryAddress}</span>
                    </div>
                </div>
                <div className='flex gap-4 sm:gap-8 justify-center'>
                   <div>
                       Barrio: <span>{order.district}</span>
                   </div>
                   <div>
                       Telefono: <span>{order.phone}</span>
                   </div>
                </div>
                <h3 className='text-xl font-bold text-blue-600 my-4'>Venta</h3>
                <table className='w-full'>
                    <thead className='bg-gray-400'>
                        <tr><th className='md:w-[250px]'>ARTICULO</th><th>CANTIDAD</th><th>PRECIO</th></tr>
                    </thead>
                    <tbody>
                        {order.sale.map(pro =>(
                            <tr key={pro._id} className='border row'><td>{pro.title}</td><td>{pro.cantidad}</td><td>${pro.offer ? ((parseInt(pro.publicPrice) - ((pro.discount / 100) * parseInt(pro.publicPrice))) * pro.cantidad).toLocaleString("AR") : (parseInt(pro.publicPrice) * pro.cantidad).toLocaleString("AR")}</td></tr>                           
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-evenly p-2 bg-gray-300'>
                    <div className='font-bold'>Cantidad de Productos: {order.totalProducts}</div>
                    <div className='font-bold'>Total a pagar: {formatter.format(order.totalPrice)}</div>
                </div>
            </fieldset>
            <button type='button' className='bg-red-500 mx-auto my-4'
                    onClick={() => {
                        setDeleteConfirm(true)
                        setDeleteOrder(order)
                    }}>
                Eliminar Orden
            </button>                              
          </div>         
       )) }
    </section>
  )
}

export default OrdersPage