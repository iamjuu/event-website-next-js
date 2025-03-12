import React from 'react'

const newButton = ({className,onClick,buttonName,icon}) => {
  return (
   <button className={`py-2 flex  gap-1 ${className}`}>
    {icon} {buttonName}
   </button>
  )
}

export default newButton
