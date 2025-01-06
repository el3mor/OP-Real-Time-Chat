import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='w-screen h-dvh flex justify-center items-center'>
      <Image src='/logo.png' alt='OP Chat' width={400} height={400}  className="animate-pulse"/>
    </div>
  )
}

export default Loader
