"use client"
import EditableImage from '@/components/layout/EditableImage'
import ErrorUser from '@/components/layout/ErrorUser'
import Loader from '@/components/layout/Loader'
import SuccessUser from '@/components/layout/SuccessUser'
import UserForm from '@/components/layout/UserForm'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const [errorText, setErrorText] = useState(false)
    const [successText, setSuccessText] = useState(false)
    const [saving, setSaving] = useState(false)
    const [admin, setAdmin] = useState(false)
    

    const session = useSession()
    const {data, status} = session  

     useEffect(()=>{
        if(status === "authenticated"){
            fetch("/api/profile")
            .then(res =>{
                res.json().then(data =>{
                    if(data) setUser(data)
                    setAdmin(data.admin)
                })
        })
    }
    },[session, status])

        const handleSubmit = async (e, data) =>{
        e.preventDefault()
        setSaving(false)

        try {
            setSaving(true)
            const response = await fetch("/api/profile", {
                method: "PUT",
                body: JSON.stringify(data)
            })

            if(response.ok){
                setSuccessText(true)
                setTimeout(() => {
                   setSuccessText(false)
                }, 2000);
            }else{
                setError(true)
            }
        } catch (error) {
            
        }
        setSaving(false)
    }
    if(status === "loading"){
        return (
           <Loader/>
        )
    }
  return (
    <section className='mt-6 bg-gradient-to-t from-gray-600 to-white p-6 rounded-md' style={{minHeight: `calc(100vh - 345px )`}}>
        {!user && (
            <Loader/>
        )}
         {saving && (
             <Loader/>
        )}
        {successText && (
            <SuccessUser {...{successText, setSuccessText}} text={"Datos actualizados con exito"}/>
        )}
        {errorText && (
            <ErrorUser {...{errorText, setErrorText}}/>
        )}
         <h1 className='text-2xl mx-auto text-center font-bold'>Perfil de usuario</h1>
         {user && (
             <UserForm user={user} onSave={handleSubmit} admin={admin}/>
         )} 
    </section>
  )
}

export default ProfilePage