import React from 'react'

const SortAndFilter = ({sortBy, setSortBy, filter, setFilter}) => {
  return (
     <div className='flex flex-col md:flex-row gap-8 items-center justify-around mb-8'>
           <div className='flex items-center gap-4'>
               <span className='text-slate-600 font-bold'>Ordenar por: </span>
               <select className='w-40 m-0' defaultValue={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value={""} disabled>Elige una opcion</option>
                    <option value={""}>Defecto</option>
                    <option value="Alphabetical">Alfabeticamente</option>
                    <option value="Price">Precio</option>
                    <option value="Stock">Stock</option>
                    <option value="Discount">Descuento</option>
               </select>
           </div>
           <div className='flex items-center gap-4'>
               <span className='text-slate-600 font-bold'>Mostrar: </span>
               <select className='w-40 m-0' defaultValue={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value={""}disabled>Elige una opcion</option>
                    <option value={""} >Todos</option>
                    <option value="super premium">Super Premium</option>
                    <option value="premium">Premium</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="economic">Economico</option>
               </select>
           </div>
     </div>
  )
}

export default SortAndFilter