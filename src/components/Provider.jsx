"use client"
import { SessionProvider } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'
import { UseProfile } from './UseProfile'

export const CartContext = createContext({})

const Provider = ({children}) => {
  const [cartProducts, setCartProducts] = useState([])
 
  const {data: dataUser} = UseProfile()

  const ls = typeof window !== "undefined" ? window.localStorage : null

     useEffect(() => {

    if (dataUser && ls && ls.getItem(`cart_${dataUser._id}`)) {
      setCartProducts(JSON.parse(ls.getItem(`cart_${dataUser._id}`)));
    }
  }, [dataUser]);

   const saveCartToLocalStorage = (cart, userId) => {
    if (ls) {
      ls.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  };

  let totalPrice = 0;
    let totalProducts = 0;

    for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].offer) {
            let discountedPrice = parseInt(cartProducts[i].publicPrice) - ((cartProducts[i].discount / 100) * parseInt(cartProducts[i].publicPrice));
            totalPrice += discountedPrice * cartProducts[i].cantidad;
        } else {
            totalPrice += parseInt(cartProducts[i].publicPrice) * cartProducts[i].cantidad;
        }
        totalProducts += cartProducts[i].cantidad;
    }

  const addToCart = (product) =>{
    setCartProducts(prev => {
      let updatedCart = [...prev]
      let existingProduct = updatedCart.findIndex(pro => pro._id === product._id)

      if(existingProduct !== -1){
        updatedCart[existingProduct] = {
          ...updatedCart[existingProduct], cantidad: updatedCart[existingProduct].cantidad + 1
        }
      }else{
        updatedCart = [...updatedCart, {...product, cantidad: 1}]
      }
       saveCartToLocalStorage(updatedCart, dataUser._id)
      return updatedCart
    })
  }

  const deleteProduct = (product) =>{
    setCartProducts(prev =>{
      
        let updatedCart = [...prev]
      let existingProduct = updatedCart.findIndex(pro => pro._id === product._id)

      if(existingProduct !== -1){
        updatedCart[existingProduct] = {
          ...updatedCart[existingProduct], cantidad: updatedCart[existingProduct].cantidad - 1
        }
        if(updatedCart[existingProduct].cantidad === 0){
          updatedCart = updatedCart.filter(pro => pro._id !== product._id)
        }
      }else{
        updatedCart = [...updatedCart, {...product, cantidad: 1}]
      }
      saveCartToLocalStorage(updatedCart, dataUser._id)
      return updatedCart
    })
  }

  
  return (
     <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts, addToCart, deleteProduct, saveCartToLocalStorage, totalPrice, totalProducts
      }}>
          {children}
      </CartContext.Provider>
     </SessionProvider>
  )
}

 export default Provider

