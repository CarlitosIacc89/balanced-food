import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
     <div className='inset-0 fixed bg-black/80 flex items-center justify-center z-10'>
        <div className=' flex bg-white w-60 py-4 justify-center rounded-xl'>
             <Image src={"/Loader.gif"} width={100} height={100} alt=''/>
        </div>
     </div>
  )
}

export default Loader