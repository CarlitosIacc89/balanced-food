"use client"
import { UseProfile } from '@/components/UseProfile'
import Close from '@/components/icons/Close'
import Eye from '@/components/icons/Eye'
import Trash from '@/components/icons/Trash'
import Loader from '@/components/layout/Loader'
import UserAdmin from '@/components/layout/UserAdmin'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [userDelete, setUserDelete] = useState(null)

    const{loading: usersLoading, data: usersData} = UseProfile()

    const router = useRouter()

    useEffect(()=>{
        getUser()
    },[])

    const getUser = () =>{
        fetch("/api/users")
        .then(res =>{
            res.json()
            .then(data =>{
                setUsers(data)
            })
        }).catch(error => console.log(error))
    }

    const handleDeleteUser = async (id) =>{
        try {
            const res = await fetch("/api/users", {
                method: "DELETE",
                body: JSON.stringify(id)
            })
            if(res.ok){
                console.log("Usuario eliminado")
                getUser()
            }else{
                throw new Error("Ups! Hubo un error al eliminar el usuario")
            }
        } catch (error) {
            console.log(error)
        }
    }

   if (usersData && typeof usersData.admin !== 'undefined' && !usersData.admin) {
     return router.push("/");
   }

  return (
    <section className='mt-8  max-w-4xl mx-auto'>
        {usersLoading && (
            <Loader/>
        )}
        <UserAdmin/>
        {showPopUp && (
            <div className='inset-0 fixed bg-black/80 flex items-center justify-center z-10'>
       <div className='flex flex-col w-80 lg:w-96 bg-white rounded-lg  items-center'>
        <span className='self-end pt-2 px-2 cursor-pointer'
              onClick={() => setShowPopUp(false)}>
            <Close className='w-7 h-7'/>
        </span>
        <p className={`flex flex-col gap-4 items-center text-xl text-gray-500 font-bold p-2 text-center`}>
            {`Eliminar el usuario "${userDelete.name}"`}
        </p>
        <div className='flex gap-4 my-4'>
            <button type='button' className='border w-16 p-1 bg-green-400'
                    onClick={() => {
                        handleDeleteUser(userDelete._id)
                        setShowPopUp(false)
                        }}>
                Si
            </button>
            <button type='button' className='border w-16 p-1 bg-red-400'
                    onClick={() => {
                        setShowPopUp(false)
                        setUserDelete(null)
                    }}>
                No
            </button>
        </div>
       </div>
    </div>
        )}
        <h1 className='text-2xl mb-8 font-bold text-gray-700 text-center'>Usuarios registrados</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y-4'>
            <thead>
                <tr className='table-head bg-gray-200'>
                    <th>Usuario</th><th>Email</th><th>Creado</th><th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? users.map(user => (
                    <tr key={user._id} className='text-center table-head'>
                        <td className=''>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
                        <td className='flex justify-center gap-2'>
                            <button type='button' className='text-white p-1 flex items-center m-0 border bg-green-400 hover:bg-green-600'
                                    onClick={() => router.push(`/users/${user._id}`) }>
                                <Eye/>
                            </button>
                            <button type='button' className='text-white p-1 flex items-center m-0 border bg-red-400 hover:bg-red-600'
                                    onClick={() => {
                                        setUserDelete(user)
                                        setShowPopUp(true)
                                    }}>
                                <Trash/>
                            </button>
                        </td>
                    </tr>
                )) : <tr>
                        <td colSpan={"3"} className='text-center'>No hay usuarios</td>
                     </tr>}
            </tbody>
        </table>
      </div>
    </section>
  )
}

export default UsersPage