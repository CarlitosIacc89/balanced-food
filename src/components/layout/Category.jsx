import React from 'react'
import Edit from '../icons/Edit'
import Trash from '../icons/Trash'

const Category = ({cat, setCategoryName, setEditedCategory, handleDeleteCategory, showPopUp, setShowPopUp}) => {
  return (
    <div key={cat._id} className='flex border items-center p-2 px-4 mb-2 rounded-md bg-gray-200'>
                <div className='grow font-semibold'>{cat.name}</div>
                <div className='flex gap-4 text-center justify-evenly'>
                    <button className='p-0 text-black hover:text-blue-700' 
                            type='button'
                            onClick={() =>{
                                setCategoryName(cat.name)
                                setEditedCategory(cat)
                            }}>
                        <Edit/>
                    </button>
                    <button className='p-0 text-black hover:text-red-500' 
                            type='button'
                            onClick={()=> handleDeleteCategory(cat._id)}>
                        <Trash/>
                    </button>
                </div>
            </div>
  )
}

export default Category