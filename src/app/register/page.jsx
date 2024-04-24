"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import {signIn} from "next-auth/react"
import Eye from '@/components/icons/Eye'
import CloseEye from '@/components/icons/CloseEye'
import Link from 'next/link'
import SuccessUser from '@/components/layout/SuccessUser'
import ErrorUser from '@/components/layout/ErrorUser'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
         const [form, setForm] = useState({})
         const [creatingUser, setCreatingUser] = useState(false)
         const [errorText, setErrorText] = useState(null)
         const [successText, setSuccessText] = useState(false)

      const [eye, setEye] = useState(false)

      const router = useRouter()

      const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
      }

      const handleFormSubmit = async (e) =>{
        e.preventDefault()
        setCreatingUser(true)
        setErrorText(null)


            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            name: form.name,
                            lastName: form.lastName,
                            email: form.email,
                            password: form.password
                        }
                        ),
                        headers: {"Content-Type": "application/json"}
                    })

                    if(!response.ok){
                        const errorData = await response.json()
                        setErrorText(errorData.message)

                    } else{
                        setSuccessText(true)
                        setTimeout(() => {
                            setSuccessText(false)
                            router.push("/login")
                        }, 2000);
                        setForm({})                        
                    }
                } catch (error) {
                    console.log(error)
                }
            
                setCreatingUser(false)
    }
  return (
    <section className='mt-4 bg-gradient-to-t from-gray-600 to-white md:pb-8'>
        {successText && (
            <SuccessUser {...{successText, setSuccessText}} text={"¡Usuario Creado!"}/>
        )}
        {errorText && (
            <ErrorUser {...{errorText, setErrorText}}/>
        )}
        <form className='max-w-lg mx-auto' onSubmit={handleFormSubmit}>
            <fieldset className='border rounded-md text-center flex flex-col p-2 pt-4 gap-4 bg-white '>
                <legend className='text-3xl px-4 font-bold text-red-500 '>Registrar</legend>
            <input type="text" 
                   name='name' 
                   placeholder='Nombre' 
                   value={form.name || ""}
                   disabled={creatingUser}
                    onChange={handleChange} />
            <input type="text" 
                   name='lastName' 
                   placeholder='Apellido' 
                   value={form.lastName || ""}
                   disabled={creatingUser}
                    onChange={handleChange} />
            <input type="email" 
                   name='email' 
                   placeholder='email' 
                   value={form.email || ""}
                   disabled={creatingUser}
                    onChange={handleChange} />
            <div className='relative'>
                <div className='absolute inset-y-0 right-1 top-1 p-1 px-2 cursor-pointer'
                     onClick={() => setEye(!eye)}>
                   {eye ? <Eye/> : <CloseEye/>}
                </div>
               <input type={`${eye ? "text" : "password"}`} 
                      name='password' 
                      placeholder='contraseña' 
                      value={form.password || ""}
                      disabled={creatingUser}
                      onChange={handleChange} />
            </div>
            <button type='submit' 
                    className='p-2 border w-[50%] mx-auto rounded-md bg-red-400 text-white hover:border-red-700'
                    disabled={creatingUser}>
                Registrar
            </button>
            <div className='text-gray-500 text-center text-sm font-bold'>
                Or login with provider
            </div>
            <button type='button' onClick={() => signIn("google", {callbackUrl: "/"})} className='flex gap-4 justify-center mb-2 text-gray-700 border'>
                <Image src={"/google.png"} width={24} height={24} alt='Google'/>
                Login with Google
            </button>
            <div className='text-gray-400 font-bold'>
                ¿Ya tienes una cuenta?{" "}<Link className='underline text-gray-800' href={"/login"}>Inicia sesion</Link>
            </div>
            </fieldset>
        </form>
    </section>
  )
}

export default RegisterPage