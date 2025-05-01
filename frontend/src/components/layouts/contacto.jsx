import React,{useState} from 'react'
import emailjs from '@emailjs/browser';
import "./css/contactof.css"
export const Contacto = () => {
    const email = (e) =>{
        e.preventDefault()
        const user = document.getElementById("firstname").value
        const emails = document.getElementById("Email").value
		const numeroT = document.getElementById("phone").value
        const messages = document.getElementById("message").value
        let  data =({
           	user_name:user,
           	email:emails,
        	message:messages,
			numero:numeroT
        })
        console.log(data)
        post(data)
    }
    const post = (data ) =>{
		console.log(data);
        emailjs.send("service_3ttevpo", "template_sla5daj",data,"OZyZikHyRdk3lV1Zx")
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
	  return (
		<div className='sliderlore'>
			<div className="containerContactform " id="container">
				<div className="form-container sign-in-contacto-container">
					<form action="#" className='formlr'>
						<h1 className='h1form'>Contactenos</h1>
						<input type="text" placeholder="Nombre" id='firstname' className='inputform'/>
						<input type="email" placeholder="E-mail" id='Email' className='inputform'/>
						<input typem="text" id="phone" placeholder="Numero Celular" className='inputform'/>
						<textarea name="text" id="message" placeholder='Danos más detalles..' cols="30" rows="10" className='inputform'></textarea>
						<button className='buttonform' onClick={email}>Contactar</button>
					</form>
				</div>
			</div>
		</div>
  )
}
