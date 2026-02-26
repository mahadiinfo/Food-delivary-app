import React from 'react'
import { dbConnect } from './lib/db'
import { auth } from './auth'
import UserModel from './model/user.model'
import { redirect,  } from 'next/navigation'
import Navbar from "@/app/components/homePage/Navbar"

async function Home() {
 
  await dbConnect()
  const session = await auth()
  const jsoneUser= await UserModel.findById(session?.user?.id)
  const user = JSON.parse(JSON.stringify(jsoneUser))
  if(!user){
     redirect("/login")

  }
   return (
    <>
      <Navbar user={user}/>
    </>
  )
}

export default Home
