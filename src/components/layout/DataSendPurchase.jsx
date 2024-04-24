import React, { useContext, useState } from 'react'
import { CartContext } from '../Provider'

const DataSendPurchase = ({dataUser, setPurchaseCompleted, setOrder}) => {
    const [personReiceves, setPersonReceives] = useState(dataUser?.name || "")
    const [deliveryAddress, setDeliveryAddress] = useState(dataUser?.address || "")
    const [numberDeliveryAddress, setNumberDeliveryAddress] = useState(dataUser?.numberAddress || "")
    const [floor, setFloor] = useState("")
    const [district, setDistrict] = useState("")
    const [emailClient, setEmailClient] = useState(dataUser?.email)
    const [phone, setPhone] = useState(dataUser?.phone || "")
    const [noteToSeller, setNoteToSeller] = useState("")

    const {totalPrice, totalProducts} = useContext(CartContext)

  return (
    <div className='w-full md:w-[40%] mt-8'>
        <h2 className='text-center mb-8 text-sm sm:text-xl font-semibold text-red-500 underline p-1'>Datos para el envio de la compra</h2>
        <form className='mt-4'>
            <label>Nombre de quien lo recibe*</label>
            <input type="text" value={personReiceves}
                               onChange={(e) => setPersonReceives(e.target.value)}
                               required/>
            <label>Direccion de entrega*</label>
            <input type="text" value={deliveryAddress}
                               onChange={(e) => setDeliveryAddress(e.target.value)}
                               required/>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label>Nro.*</label>
                    <input type="text" value={numberDeliveryAddress}
                                       onChange={(e) => setNumberDeliveryAddress(e.target.value)}
                                       required />
                </div>
                <div>
                    <label>Piso(opcional)</label>
                    <input type="text"
                           onChange={(e) => setFloor(e.target.value)}/>
                </div>
            </div>
            <label>Barrio*</label>
            <input type="text"
                   onChange={(e) => setDistrict(e.target.value)} 
                   required />
            <label>Email del cliente</label>
            <input type="text" value={emailClient} disabled/>
            <label>Telefono*</label>
            <input type="text" value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   required/>
            <label>NOTA PARA EL VENDEDOR (opcional)</label>
            <textarea className='resize-none' cols="30" rows="5" 
                      onChange={(e) => setNoteToSeller(e.target.value)}>
            </textarea>
            <button type='button' className='mx-auto bg-green-500 hover:bg-green-600 transition-all duration-300 mt-8'
                onClick={() => {
                    setPurchaseCompleted(true)
                    setOrder({personReiceves,
                                deliveryAddress,
                                numberDeliveryAddress,
                                floor,
                                district,
                                emailClient,
                                phone,
                                noteToSeller,
                                totalProducts,
                                totalPrice})
                    }}>
                Generar orden
            </button>
        </form>
     </div>
  )
}

export default DataSendPurchase