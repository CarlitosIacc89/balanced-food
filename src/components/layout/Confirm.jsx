import React from 'react'

const Confirm = ({deleteBrands, setDeleteBrands, setDeleteConfirm, deleteConfirm, handleDelete}) => {
  return (
<div className='inset-0 fixed bg-black/80 flex items-center justify-center z-10'>

    <div className="rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="text-lg font-bold">¿Estas seguro que quieres eliminar este elemento?</h2>

        <p className="mt-2 text-sm text-gray-500">
            ¡Hacer esto, podria causar algunos errores en la pagina!
        </p>

      <div className="mt-4 flex gap-2">
        <button type="button" className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                onClick={() => {
                    handleDelete(deleteBrands._id)
                }}>
          Si, estoy seguro
        </button>

        <button type="button" className="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                onClick={() => {
                    setDeleteConfirm(false)
                    setDeleteBrands(null)
                    }}>
          No, mejor no
        </button>
      </div>
    </div>
</div>
  )
}

export default Confirm