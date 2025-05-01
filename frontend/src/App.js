import { Home } from "./components/pages/home/index";
import { Contact} from "./components/pages/contact/contact.jsx";
import { About } from "./components/pages/about/about";
import { ConsultBarber } from "./components/pages/ConsultBarber/ConsultBarber";
import { Loginregister } from "./components/pages/loginregister/loginregister.jsx";
import { Perfil } from "./components/pages/perfil/perfil";
import { Agendar } from "./components/pages/agendar/agendar";
import { Cita } from "./components/pages/citas/Cita"
import './App.css';
import {Routes, BrowserRouter, Route, Navigate} from "react-router-dom"; 
import { useState } from "react";

function App() {
  const [user, setUser]= useState(null)
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                {!user &&(
                  <>
                    <Route path="/Loginregister" element={<Loginregister authenticate={()=>setUser(true)}/>}/>
                  </>
                )}
                {user &&(
                  <>
                    <Route path="/Perfil" element={<Perfil logout={()=>setUser(false)}/>}/>
                  </>
                )}
               <Route path="/Agendar" element={<Agendar/>}/>
               <Route path="/" element={<Home/>}/>
               <Route path="/Contact" element={<Contact/>}/>
               <Route path="/About" element={<About/>}/>
               <Route path="/ConsultBarber" element={<ConsultBarber/>}/>
               <Route path="/Cita" element={<Cita/>}/>
               <Route path="*" element={<Navigate to={user ? "/Perfil":"/Loginregister"}/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
