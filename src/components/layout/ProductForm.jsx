"use client"
import React, { useEffect, useState } from 'react'
import EditableImage from './EditableImage'
import { usePathname } from 'next/navigation'


const ProductForm = ({onSave, brand, product}) => {

    const [title, setTitle] = useState(product?.title || "")
    const [description, setDescription] = useState(product?.description || "")
    const [kilogram, setkilogram] = useState(product?.kilogram || "")
    const [protein, setProtein] = useState(product?.protein || "")
    const [type, setType] = useState(product?.type || "")
    // const [price, setPrice] = useState(product?.price || "")
    const [basePrice, setBasePrice] = useState(product?.basePrice || 0)
    const [quantity, setQuantity] = useState(product?.quantity || 0)
    const [specie, setSpecie] = useState(product?.specie || "")
    const [stage, setStage] = useState(product?.stage || "")
    const [specific, setSpecific] = useState(product?.specific || false)
    const [size, setSize] = useState(product?.size || "")
    const [savour, setSavour] = useState(product?.savour || "")
    const [selectBrand, setSelectBrand] = useState(product?.selectBrand || "")
    const [image, setImage] = useState(product?.image || "")
    const [quality, setQuality] = useState(product?.quality || "")
    const [kilogramOfGift, setKilogramOfGift] = useState(product?.kilogramOfGift || false)
    const [offer, setOffer] = useState(product?.offer || false)
    const [discount, setDiscount] = useState(product?.discount || 0)
    const [revenue, setRevenue] = useState(25)
    const [publicPrice, setPublicPrice] = useState(0)
    const [basePriceIncrease, setBasePriceIncrease] = useState(0)

    const path = usePathname()

     useEffect(()=>{
       if(basePrice ){
         const priceNumber = parseInt(basePrice)
         const valuePercentage = (priceNumber * revenue) / 100 
         const pPrice = priceNumber + valuePercentage
         setPublicPrice(Math.round(pPrice))
       } else{
         console.log(basePrice)
         setPublicPrice(0)
       }

     
     },[basePrice, revenue])

    //  useEffect(() => {
    //     if(basePriceIncrease && basePrice){
    //      let priceNumber = parseInt(basePrice)
    //      let valuePercentage = (priceNumber * basePriceIncrease) / 100
    //      let bPrice = priceNumber + valuePercentage
    //      setBasePrice(bPrice)
    //    }
    //  },[basePriceIncrease, basePrice])


  return (
    <form className='mt-8 max-w-md mx-auto'
           onSubmit={(e) =>{
            onSave(e, {
                title,
                description,
                kilogram,
                protein,
                type,
                // price,
                basePrice,
                publicPrice,
                quantity, 
                specie,
                stage,
                specific,
                size,
                savour,
                selectBrand,
                image,
                quality,
                kilogramOfGift,
                offer,
                discount
            })
           }}>
           <div className='flex flex-col'>
            <div className='mx-auto text-center mb-3'>
                 <EditableImage link={image} setLink={setImage}/>
            </div>
            <label>Titulo del producto</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>Descripcion</label>
            <textarea className='resize-none' name="" id="" cols="30" rows="5" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}>
            </textarea>
             <div className='grid grid-cols-2  lg:grid-cols-3 gap-4 items-center'>
                <div>
                   <label>Kilos (Kg)</label>
                   <input type="text" value={kilogram} onChange={(e) => setkilogram(e.target.value)} />
                </div>
                <div>
                   <label>Proteinas (%)</label>
                   <input type="text" value={protein} onChange={(e) => setProtein(e.target.value)} />
                </div>
                <div>
                  <label>Tipo</label>
                  <select className='p-0 h-11 pb-[3px]' defaultValue={type} onChange={(e) => setType(e.target.value)}>
                    <option value={""} disabled>Tipo</option>
                    <option value="seco">Seco</option>
                    <option value="humedo">Humedo</option>
                  </select>
                </div>
             
             </div>
             <div className='grid grid-cols-2 gap-4 items-center'>
                  <div>
                     <label>Precio base ($)</label>
                     {/* <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /> */}
                      <input type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
                  </div>
                
             </div>
             <div className='grid grid-cols-2 gap-4 items-center'>
                  <div>
                    <label>Ganancia (%)</label>
                    <input type="number" min={0} value={revenue} onChange={(e) => setRevenue(e.target.value)} />
                  </div>
                 <div>
                     <label>Precio publico ($)</label>
                     <input type="number" value={publicPrice} onChange={(e) => setPublicPrice(e.target.value)} />
                 </div>
             </div>
             <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                <div>
                   <label>Cantidad</label>
                   <input type="number" min={0} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </div>
                <div>
                  <label>Especie</label>
                  <select className='p-0 h-11 flex pb-[3px]' defaultValue={specie} onChange={(e) => setSpecie(e.target.value)}>
                    <option value={""} disabled>Especie</option>
                    <option value="dog">Perro</option>
                    <option value="cat">Gato</option>
                  </select>
                </div>
                <div>
                  <label>Etapa</label>
                  <select className='p-0 h-11 flex pb-[3px]' defaultValue={stage} onChange={(e) => setStage(e.target.value)}>
                    <option value={""} disabled>Etapa de vida</option>
                    <option value="puppy">Cachorro</option>
                    <option value="adult">Adulto</option>
                    <option value="senior">Adulto Mayor</option>
                  </select>
                </div>
                <div>
                    <label>Necesidad Esp.</label>
                    <div className='flex justify-evenly h-11'>
                        <div className='flex gap-2 items-center'>
                          <label htmlFor='si'>Si</label>
                          <input type="radio" name='especifico' id='si' checked={specific} onChange={() => setSpecific(true)} />
                        </div>
                        <div className='flex gap-2 items-center'>
                          <label htmlFor="no">No</label>
                          <input type="radio" name='especifico' id='no' checked={!specific}  onChange={() => setSpecific(false)}/>
                        </div>
                    </div>
                </div>
             </div>
             <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                <div>
                    <label>Tamaño</label>
                     <select className='p-0 h-11 flex pb-[3px]' disabled={specie === "cat" ? true : false} defaultValue={size} onChange={(e) => setSize(e.target.value)}>
                       <option value={""} disabled>Selecciona tamaño</option>
                       <option value="small">Pequeño</option>
                       <option value="medium">Mediano</option>
                       <option value="large">Grande</option>
                       <option value="All">All Breeds</option>
                     </select>
                </div>
                <div>
                    <label>Sabor</label>
                    <input type="text" value={savour} onChange={(e) => setSavour(e.target.value)} />
                </div>
                <div>
                    <label>Marca</label>
                    <select className='p-0 h-11 flex pb-[3px]' defaultValue={selectBrand} onChange={(e) => setSelectBrand(e.target.value)}>
                        <option value={""} disabled>Selecciona marca</option>
                       {brand && brand.map((b, index) => (
                        <option key={index} value={b}>{b}</option>
                       ))}
                    </select>
                </div>
             </div>
             <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                <div>
                    <label>Calidad</label>
                     <select className='p-0 h-11 flex pb-[3px]'  defaultValue={quality} onChange={(e) => setQuality(e.target.value) }>
                       <option value={""} disabled>Selecciona calidad</option>
                       <option value="economic">Economico</option>
                       <option value="intermediate">Intermedio</option>
                       <option value="premium">Premium</option>
                       <option value="super-premium">Super Premium</option>
                     </select>
                </div>
                <div>
                    <label>Kilos de regalo</label>
                    <div className='flex justify-evenly h-11'>
                        <div className='flex gap-2 items-center'>
                          <label htmlFor='si'>Si</label>
                          <input type="radio" name='kilogram-of-gift' id='si' checked={kilogramOfGift} onChange={() => setKilogramOfGift(true) } />
                        </div>
                        <div className='flex gap-2 items-center'>
                          <label htmlFor="no">No</label>
                          <input type="radio" name='kilogram-of-gift' id='no' checked={!kilogramOfGift}  onChange={() => setKilogramOfGift(false) }/>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Oferta</label>
                    <div className='flex justify-evenly h-11'>
                        <div className='flex gap-2 items-center'>
                          <label htmlFor='si'>Si</label>
                          <input type="radio" name='oferta' id='si' checked={offer} onChange={() => setOffer(true) } />
                        </div>
                        <div className='flex gap-2 items-center'>
                          <label htmlFor="no">No</label>
                          <input type="radio" name='oferta' id='no' checked={!offer}  onChange={() => setOffer(false) }/>
                        </div>
                    </div>
                </div>
                <div>
                   <label>Desc. %</label>
                   <input className='w-11' type="number" disabled={offer === false && true} value={discount} onChange={(e) => setDiscount(e.target.value)} min={0} />
                </div>
             </div>
           </div>
           <div className='flex justify-center gap-4 mt-4'>
               <button className='border bg-green-400'>
                {path.includes("edit") ? "Guardar" : "Crear"}
               </button>
           </div>
        </form>
  )
}

export default ProductForm