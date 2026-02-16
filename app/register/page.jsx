"use client"
import React, { useState } from 'react'
import Welcome from '@/app/components/Welcome'
import RegisterForm from '@/app/components/RegisterForm'

const Register = () => {
  const [step, setstep] = useState(1)
  return (
    <div>
      {step == 1 ? <Welcome nextStep={setstep} /> : <RegisterForm nextStep={setstep} />}
      
    </div>
  )
} 

export default Register
