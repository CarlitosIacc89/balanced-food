import React from 'react'
import CheckHealt from '../icons/CheckHealt'

const SectionHeaders = ({name, textColor, children}) => {
  return (
    <>
        <h1 className={`text-4xl mx-auto text-center absolute -top-5 left-0 right-0 w-40 bg-white px-2 `}>
            <span className={`flex items-center justify-center gap-2 ${textColor} font-bold`}>
                <em>
                    {name}
                </em>
            <CheckHealt/>
            </span>
        </h1>
        <p className="text-center mt-4 text-gray-900 font-bold text-lg">
          <em>
            {children}
          </em>            
        </p>
    </>
  )
}

export default SectionHeaders