import React, { useState } from 'react'
import { Header } from '../../layouts/header'
import { Footer } from '../../layouts/footer'
// import { Slider} from "../../layouts/slider"
import { Lore } from '../../layouts/lore'

export const Loginregister = ({authenticate}) => {
  const [user, setUser]=useState(null)
  if(user){
    authenticate()
  }
  return (
      <div>
        <Header/>
        <Lore authenticate={()=>setUser(true)}/>
        <Footer/>
      </div>
  )
}
