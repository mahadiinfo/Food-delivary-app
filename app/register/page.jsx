"use client"
import React, { useState } from 'react'
import Welcome from '@/app/components/registerPage/Welcome'
import RegisterForm from '@/app/components/registerPage/RegisterForm'

const Register = () => {
  const [step, setstep] = useState(1)
  return (
    <div>
      {step == 1 ? <Welcome nextStep={setstep} /> : <RegisterForm nextStep={setstep} />}
      
    </div>
  )
} 

export default Register
