import React from 'react'
import Close from '../icons/Close'
import Error from '../icons/Error'

const ErrorUser = ({errorText, setErrorText}) => {
  return (
    <div className='inset-0 fixed bg-black/80 flex items-center justify-center z-10'>
       <div className='flex flex-col w-80 lg:w-96 text-xl bg-white rounded-lg  items-center'>
        <span className='self-end pt-2 px-2 cursor-pointer'
              onClick={() => setErrorText(null)}>
            <Close className='w-7 h-7'/>
        </span>
        <p className="flex flex-col gap-4 items-center text-gray-500 font-bold text-center px-6">
            {errorText}
            <Error className='w-14 h-14'/>
            <button type='button' className='w-16 py-1 mb-4 border-0 bg-red-500 text-white text-[15px]' onClick={() => setErrorText(null)}>Cerrar</button>
        </p>
       </div>
    </div>
  )
}

export default ErrorUser