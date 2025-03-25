import {  SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='flex w-full justify-center items-center h-screen'>
      <SignUp />
    </div>
  )
}

export default SignUpPage
