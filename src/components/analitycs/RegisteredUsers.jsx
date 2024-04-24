import React from 'react'

const RegisteredUsers = ({users}) => {
  return (
    <div className='bg-gray-100 flex flex-col gap-2 border p-4 text-center rounded-xl'>
        <span className='font-bold'>Usuarios registrados</span>
        <span className='text-4xl font-extrabold'>{users.length}</span>
    </div>
  )
}

export default RegisteredUsers