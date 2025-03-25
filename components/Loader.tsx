import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <Image
        src="/assets/icons/loader.svg"
        alt='Loader'
        width={32}
        height={32}
        className='animate-spin'
      />
      <span className='pl-2'>Loading...</span>
    </div>
  )
}

export default Loader
