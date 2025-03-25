import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex w-full justify-center items-center h-screen'>
      <SignIn />
    </div>
  )
}

export default SignInPage
