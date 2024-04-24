"use client"
import { Salsa } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import ChevronDown from '../icons/ChevronDown'
import DivHidden from '../menu/DivHidden'
import ChevronUp from '../icons/ChevronUp'
import ButtonMenu from '../icons/ButtonMenu'
import MenuHidden from '../menu/MenuHidden'
import Search from '../icons/Search'
import { signOut, useSession } from 'next-auth/react'
import ShoppingCart from '../icons/ShoppingCart'
import { CartContext } from '../Provider'
import ProductSearch from './ProductSearch'
import { usePathname} from 'next/navigation'

const salsa = Salsa({subsets: ["latin"],  weight: ["400"]})

const Header = () => {
    const [dog, setDog] = useState(false)
    const [cat, setCat] = useState(false)
    const [user, setUser] = useState(null)
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])
    const [productsFound, setProductsFound] = useState([])

     const session = useSession()
     const path = usePathname()
     //Expresion regular para controlar la insercion del buscador general
     const containsKeywords = /profile|users|products-items|brands-admin|orders|analytics/.test(path);

    const {cartProducts} = useContext(CartContext)

     const {data, status} = session

     const userData = data?.user
     let userName = userData?.name || userData?.email

     if(userName && userName.includes(" ")){
         userName = userName.split(" ")[0]
     }
   
        useEffect(()=>{
        fetch("/api/profile").then(res => res.json().then(data => setUser(data) ))
        fetch("/api/products").then(res => res.json().then(data => setProducts(data)))
    },[])

    useEffect(() =>{
        if(products.length > 0){
            const found = products.filter(pro => pro.title.toLowerCase().includes(search.toLowerCase()))
            setProductsFound(found)
        }
        if(search === "" || search === " "){
            setProductsFound([])
        }
    },[search])

    useEffect(() =>{
        if(menu){
            document.body.style.overflow = "hidden"
            document.documentElement.style.overflow = "hidden"
        }else{
            document.body.style.overflow = ""
            document.documentElement.style.overflow = ""
        }
    },[menu])
    

    

    const borderBottom = 'hover:border-b-4 transition-all duration-100  hover:border-red-400 p-2'
 
  return (
    <header className='  flex flex-col items-center'>
        <div className='flex pl-12 sm:pl-0 h-24 lg:h-32  items-center relative w-full justify-end lg:justify-between mb-8 shadow-lg bg-gray-100 bg-opacity-90'>

        {menu && <MenuHidden {...{menu, setMenu, dog, setDog, cat, setCat, session, userName}}/>}
            <nav className='flex gap-8 items-center font-semibold text-gray-500 link'>
                <div className='absolute lg:hidden left-0 ml-5'>
                    <button type='button' onClick={()=> setMenu(!menu)}>
                        <ButtonMenu className='h-9 w-9'/>
                    </button>
                </div>
                <Link href={"/"} className='mr-8 sm:mr-20'>
                    <div className='flex gap-2 items-center font-bold'>
                        <Image className=' w-16 transition-all duration-300 lg:w-24' src={"/DomesticPet-Edit.png"} width={50} height={50} alt='logo'/>
                        <span className={`${salsa.className} hidden sm:block text-lg text-gray-900 md:text-2xl `}>Domestic Pet</span>
                    </div>
                </Link>
                <div className='hidden lg:flex gap-6 items-center justify-between '>
                    <div className='relative'>
                        <Link href={""} className={`flex gap-1 items-center hover:border-b-8 hover:border-red-400 transition-all duration-200 ${dog ? 'border-b-8 border-red-400' : 'border-b-0'}`} 
                              onClick={() => {
                                  setDog(!dog)
                                  setCat(false)
                                }}>
                            Perros
                          {dog ? <ChevronUp/> : <ChevronDown/>}                     
                        </Link>
                        <div className={`${dog ? "block" : "hidden"}`}>
                           <DivHidden close={dog} setClose={setDog} specie={"dog"} puppy={"Cachorro"}/>
                        </div>
                    </div>                              
                    <div className='relative'>
                        <Link href={""}  className={`flex gap-1 items-center hover:border-b-8 hover:border-red-400 transition-all duration-200 ${cat ? 'border-b-8 border-red-400' : 'border-b-0'}`}
                              onClick={() => {
                                setCat(!cat)
                                setDog(false)
                            }}>
                            Gatos
                            {cat ? <ChevronUp/> : <ChevronDown/>}
                        </Link>
                        <div className={cat ? "block" : "hidden"}>
                          <DivHidden close={cat} setClose={setCat} specie={"cat"} puppy={"Kitten"}/>
                        </div>
                    </div>
                    <Link href={"/kgs-de-regalo"} className='w-[130px]'>
                        <span className={borderBottom}>
                            Kg de regalo
                        </span>
                    </Link>
                    <Link href={"/offers"}>
                        <span className={borderBottom}>
                            Ofertas
                        </span>
                    </Link>
                </div>
            </nav>
            <nav className='flex items-center pb-1 gap-8 text-gray-500 mr-10  font-semibold'>
                {status === "authenticated"
                 ?
                 <div className='flex items-center w-full'>
                  <div className='flex items-center mr-2 sm:mr-10 gap-4'>

                    <Link className='w-full ' href={"/profile"}>
                        <div className='flex items-center gap-2 w-full'>
                            <Image className='rounded-full object-cover max-w-[40px] max-h-[40px]' src={user?.image || "/NoProfile.webp"} width={40} height={40} alt=''/>
                        <span className='hidden lg:flex'>{user?.name}!!</span>
                        </div>
                    </Link>
                    <Link href={"/cart"} className='relative'>
                        <ShoppingCart/>
                        <span className='absolute text-center -top-2 -right-4 bg-red-600 text-white text-xs py-1 px-1 rounded-full leading-3'>
                             {cartProducts.length}
                        </span>
                    </Link>
                   </div>
                    <button type='button' 
                            className='hidden lg:block px-4 py-2 rounded-md bg-red-400 text-white min-w-[92px]'
                            onClick={() => {
                                signOut()
                                }}>
                                Salir
                    </button>
                 </div>
                    
                 : <>
                     <Link href={"/login"} className='hidden lg:flex'>Login</Link>
                     <Link href={"/register"} className='px-4 py-2 rounded-md bg-red-400 text-white min-w-10'>Register</Link>
                   </>
                 }
                
            </nav>
        </div>
        {!containsKeywords && (
             <div className=' my-4 w-[80%] max-w-2xl mx-auto text-center relative'>
            <div className='absolute inset-y-0 right-0 top-1 p-1 px-2 cursor-pointer'>
                <Search/>
            </div>
            <input className='border border-gray-200 bg-gray-200 rounded-md w-full max-w-2xl box-border p-2 pr-9 outline-none focus:border-red-200' 
                   type="text" 
                   placeholder='Buscar producto'
                   value={search}
                   onChange={(e) => setSearch(e.target.value)} />
            <div className={`absolute ${productsFound.length > 0 ? "block" : "hidden"} top-10 w-full border z-10 bg-white`}>
               {productsFound.length > 0 && (productsFound.map(product =>(
                     <ProductSearch key={product._id} {...{product, setSearch}}/>
               )))}
            </div>
        </div>
        )}
       
    </header>
  )
}

export default Header