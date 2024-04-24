"use client"
import CloseEye from '@/components/icons/CloseEye'
import Eye from '@/components/icons/Eye'
import ErrorUser from '@/components/layout/ErrorUser'
import SuccessUser from '@/components/layout/SuccessUser'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
    const [form, setForm] = useState({})
    const [eye, setEye] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const router = useRouter()

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try {
            const res =  await signIn("credentials", {email: form.email, password: form.password, callbackUrl: "/"})
            if(res.error) return setError(res.error)
            if(res.ok) {
                setSuccess(true)

                setTimeout(()=>{
                    setSuccess(false)
                },2000)
                 setTimeout(() => {
                     window.location.reload()
                 }, 2500);
            }

        } catch (error) {
            console.log(error)
        }

       
    }
  return (
    <section className='mt-4 bg-gradient-to-t from-gray-600 to-white md:pb-8'>
        {error && (
            <ErrorUser errorText={error} setErrorText={setError}/>
        )}
        {success && (
            <SuccessUser successText={success} setSuccessText={setSuccess} text={"¡¡Inicio de sesion exitoso!!"}/>
        )}
        <form className='max-w-lg mx-auto' onSubmit={handleSubmit}>
            <fieldset className='border rounded-md text-center flex flex-col p-4 pt-4 gap-4 bg-white'>
                <legend className='text-3xl px-4 font-bold text-red-500 '>Iniciar Sesion</legend>
                <input type="email" 
                   name='email' 
                   placeholder='email' 
                   value={form.email}
                   
                    onChange={handleChange} />
            <div className='relative'>
                <div className='absolute inset-y-0 right-1 top-1 p-1 px-2 cursor-pointer'
                     onClick={() => setEye(!eye)}>
                   {eye ? <Eye/> : <CloseEye/>}
                </div>
               <input type={`${eye ? "text" : "password"}`} 
                      name='password' 
                      placeholder='contraseña' 
                      value={form.password}
                     
                      onChange={handleChange} />
            </div>
            <button type='submit' 
                    className='p-2 border w-[50%] mx-auto rounded-md bg-red-400 text-white hover:border-red-700'
                    >
                Iniciar Sesion
            </button>
            <div className='text-gray-500 text-center text-sm font-bold'>
                Or login with provider
            </div>
            <button type='button' onClick={() => signIn("google", {callbackUrl: "/"})} className='flex gap-4 justify-center mb-2 text-gray-700 border'>
                <Image src={"/google.png"} width={24} height={24} alt='Google'/>
                Iniciar sesion con Google
            </button>
            <div className='text-gray-400 font-bold'>
                ¿No tienes una cuenta?{" "}<Link className='underline text-gray-800' href={"/register"}>Registrate</Link>
            </div>
            </fieldset>
        </form>
    </section>
  )
}

export default LoginPage


/**
 *    <input type="email" 
                   name='email' 
                   placeholder='email' 
                   value={form.email}
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
                      value={form.password}
                      disabled={creatingUser}
                      onChange={handleChange} />
            </div>
            <button type='submit' 
                    className='p-2 border w-[50%] mx-auto rounded-md bg-red-400 text-white hover:border-red-700'
                    disabled={creatingUser}>
                Registrar
            </button>
 */