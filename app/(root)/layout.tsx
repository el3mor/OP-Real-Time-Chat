import React, { ReactNode } from 'react'
import SideBar from '../components/SideBar'


const layout = ({children}: {children:ReactNode}) => {
  return (
    <div className="w-screen h-dvh container mx-auto max-md:pt-5 max-md:px-4 md:py-16 md:px-6 flex max-md:flex-col-reverse  gap-4">
      <SideBar />
      
      {children}
    
    </div>
  )
}

export default layout
