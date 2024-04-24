"use client"
import { CartContext } from '@/components/Provider'
import Caution from '@/components/icons/Caution'
import Check from '@/components/icons/Check'
import ShoppingCart from '@/components/icons/ShoppingCart'
import AlertSuccess from '@/components/layout/AlertSuccess'
import Loader from '@/components/layout/Loader'
import Modal from '@/components/layout/Modal'
import ProductInformation from '@/components/layout/ProductInformation'
import RelatedCarrousel from '@/components/layout/RelatedCarrousel'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

const PageProductCat = ({params}) => {
   const [product, setProduct] = useState(null)
    const [showPopUp, setShowPopUp] = useState(false)
    const [alert, setAlert] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState(null)


   const {addToCart} = useContext(CartContext)

   const session = useSession()
   const {status} = session

 

   useEffect(()=>{
       fetch(`/api/products?id=${params.id}`)
       .then(res =>{
        res.json()
        .then(data => setProduct(data))
       })
       .catch(error =>{
        console.log(error)
       })
        fetch(`/api/products`)
       .then(res => {
        if(!res.ok){
          throw new Error("Ups! Ocurrio un error")
        }
        res.json().then(pro => {
          const relPro = pro.filter(p => p.selectBrand === product?.selectBrand)
          setRelatedProducts(relPro)
        } )
       })
       .catch(error => console.log(error))
   },[params.id, product?.selectBrand])

  return (
    <section className='mt-8'>
        {showPopUp && (
            <Modal {...{setShowPopUp, showPopUp}}/> 
        )}

        <AlertSuccess {...{alert, setAlert}} />
        {product ? (<div className='grid lg:grid-cols-2 justify-center text-center bg-gradient-to-t from-white to-gray-200 md:p-4 rounded-lg'>
            <div className='relative'>
                <div>
                    <Image src={product?.image} className='mx-auto' height={480} width={480} alt='image'/> 
                </div>
                {product.offer && (
                    <div className='absolute flex justify-center top-10 left-2 text-sm sm:text-base md:left-44 rounded-full p-2 sm:p-4 bg-blue-500 text-white font-bold w-14'>
                        <span>-{product.discount}%</span>
                      </div>
                )}
            </div>
            <div className='flex flex-col gap-4 my-8 md:m-0'>
                <h1 className='text-xl md:text-4xl font-bold text-gray-700'>{product?.title}{" "}{product?.kilogram}Kg</h1>
                <div className='text-gray-600 font-bold text-sm'>
                    <p className='leading-loose my-6'>{product?.description}</p>
                    <p className='text-base'><span className='font-bold'>Proteinas: </span>{product?.protein}%</p>
                </div>
                <div>
                    <p className='text-5xl font-semibold text-red-500'>${parseInt(product?.publicPrice).toLocaleString("AR")}</p>
                </div>
                <div>
                    <p className={product?.quantity > 0 ? 'text-green-500 font-bold' : 'text-red-400 font-bold'}>{product?.quantity} disponible</p>
                </div>
                <div>
                    <button type='button' disabled={product?.quantity <= 0 && true} className='disabled:bg-gray-500 disabled:text-slate-300 bg-red-500 font-bold mx-auto mt-4 text-sm sm:text-base hover:bg-red-600 transition-all duration-300'
                             onClick={(e) => {
                              e.preventDefault()
                              if(status !== "authenticated"){
                                  setShowPopUp(true)
                                  return
                                }else{
                                  setShowPopUp(false)
                                  setAlert(true)
                                  addToCart(product)

                                  setTimeout(() => {
                                    setAlert(false)
                                  }, 2000);
                                }
                            }}>
                        <ShoppingCart/>
                        Agregar
                    </button>
                </div>
                 <div className='flex flex-col items-center gap-2 font-bold text-sm md:text-base mt-6 bg-green-200 p-2 border border-green-600 rounded-md'>
                       <p className='flex gap-1 items-center'><Check color='text-green-400'/><span>Recibilo en tu domicilio GRATIS*</span></p>
                       <p className='flex gap-1 items-center'><Check color='text-green-400'/><span>El mejor precio de Cordoba lo encontras aqui</span></p>
                       <p className='flex gap-1 items-center'><Caution/> <span>Consultar por precios mayoristas</span></p>
                 </div>
            </div>
        </div>) : (<div><Loader/></div>)}
        {product && (
            <ProductInformation {...{product}}/>
        )}
          {relatedProducts && (
         <RelatedCarrousel relatedProducts={relatedProducts} text={"Alimentos relacionados"}/>
       )}
    </section>
  )
}

export default PageProductCat