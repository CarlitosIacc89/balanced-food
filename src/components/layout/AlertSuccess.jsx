"use client"
import React, { useState } from 'react'

const AlertSuccess = ({alert, setAlert}) => {
   
  return (
    <div role="alert" className={`fixed z-10 ${alert ? "top-5 transition-all duration-300"  : "-top-32"}   left-1/2 transform -translate-x-1/2 mx-auto rounded-xl border border-gray-100 bg-white p-4 w-96`}>
         <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 strokeWidth="1.5"
                 stroke="currentColor"
                 className="h-6 w-6"
              >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
               />
              </svg>
            </span>

            <div className="flex-1">
                  <strong className="block font-medium text-gray-900"> Producto agregado </strong>
                  <p className="mt-1 text-sm text-gray-700">¡El producto ha sido agregado al carrito!.</p>
            </div>
          </div>
    </div>
  )
}

export default AlertSuccess