import React,{ useState} from 'react'
import { Header } from '../../layouts/header'
import { Footer } from '../../layouts/footer'
import { Perfiles } from '../../layouts/PerfilCliente'
import { PerfilTrabajador } from '../../layouts/PerfilTrabajador'
export const Perfil = ({logout}) => {
  const [user, setUser]=useState(null)
  if(user){
    logout()
    window.localStorage.removeItem("loggedNoteAppUser")
  }
  const Greating = ()=>{
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser")
    const rolesD = JSON.parse(loggedUserJSON)
    let rolT = rolesD.userTrabajador
    console.log("hola ",rolesD);
    if(typeof rolT === "undefined"){
      console.log("cliente");
      return(<Perfiles/>)

    ;}else{
      return(<PerfilTrabajador/>)
    };
  }
  
  return (
      <div>
        <Header logout={()=>setUser(true)}/>
        <div className="containerNegro">
          {
            <Greating/>
            }
        </div>
        <Footer/>
      </div>
  )
}
