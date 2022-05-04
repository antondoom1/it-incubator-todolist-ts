import React from 'react'

type PropsType = {
  title: string
}

export const UniversalComponent: React.FC<PropsType> = ({title, children}) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
      <div>
        <span>Yes</span>
        <span>No</span>
      </div>
    </div>
  )
}

