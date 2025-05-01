import React, {useEffect, useState} from 'react'
import "./css/lore.css"
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
export const Lore = ({authenticate}) => {
    const [categoria, setCategoria]=useState([])
    const [Mostrar, setMostrar] = useState(null)
    useEffect(()=>{
        const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser")
        if(loggedUserJSON){
            authenticate()
        }
        getCategoria()
    },[])
    const getCategoria = ()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/categoria'
          })
            .then(function (response) {
              setCategoria(response.data.data)
            });
    }
    const navigate = useNavigate()
    const change1 = () =>{
        const nuevoForm= document.querySelector(".nuevoForm")
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
        nuevoForm.classList.remove("mostrarFormulario");
        nuevoForm.classList.add("regresarFormulario");
    }
    const change2 = ()=>{
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }
    const [datasL, setDataL]=useState({
        "Email":"",
        "Password":""
    })
    const changeLogin = ({target})=>{
        const {name , value} = target
        setDataL({
            ...datasL, 
            [name]:value
        })
        console.log("->", datasL);
    }
    const login = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3000/api/login',datasL )
        .then(function (response) {
            console.log(response);
            window.localStorage.setItem(
                "loggedNoteAppUser", JSON.stringify(response.data.data)
            )
            postL()
        })
        .catch(function (error) {
            console.log(error);
            if(error){
                Swal.fire({
                    title: '¡¡¡Los datos son erroneos!!!',
                    text: '¡Email o Contraseña son incorrectos !',
                    icon: 'error',
                    confirmButtonColor: '#333',
                    background: '#292929',
                    color: '#fff',
                    confirmButtonAriaLabel: 'Ok',
                  })
            }
        });
    }
    const postL = () => {
        authenticate()
        navigate("Loginregister")
    }
    
    const  RegisterCliente= (e)=>{
        e.preventDefault()
        const trabajador = document.getElementById("trabajador").checked
        const cliente = document.getElementById("cliente").checked
        if(trabajador){
            validacionRol(true)
        }else{if(cliente){
            console.log("esta aca");
            validacionRol(false)
            }else{validacionRol(null)}
        }
    }
    
    const validacionRol = (rolesUs) =>{
        console.log(rolesUs);
        if(rolesUs){
            const userT = document.getElementById("rname").value
            const passwordT = document.getElementById("rpassword").value
            const telefonoT = document.getElementById("ruser").value
            const apellidoT = document.getElementById("rapellido").value
            const emailT = document.getElementById("remail").value
            const categoriaT = document.getElementById("seleciona").value
            const nomLocalT = document.getElementById("nomLocal").value
            const direccionLocalT = document.getElementById("direccionLocal").value
            let dataR= {
                "Nombres":userT,
                "Password":passwordT,
                "Telefono":telefonoT,
                "Apellidos":apellidoT,
                "Email":emailT,
                "Nom_local":nomLocalT,
                "idCategoria":categoriaT,
                "Direccion":direccionLocalT,
                "Rol":"trabajador"
            }
            console.log("dentroTrabajador");
            verficacion(passwordT, telefonoT, 2, dataR)
        }else{ if(rolesUs=== false)
        {   console.log("dentroCLiente");
            const user = document.getElementById("rname").value
            const password = document.getElementById("rpassword").value
            const telefono = document.getElementById("ruser").value
            const apellido = document.getElementById("rapellido").value
            const email = document.getElementById("remail").value
            console.log(typeof user);
            const dataRc = {
                "Nombres":user,
                "Password":password,
                "Telefono":telefono,
                "Apellidos":apellido,
                "Email":email,
                "Rol":"usuario"
        }
        console.log(password.length);
        verficacion(password, telefono, 1, dataRc)
            
        }else{
        Swal.fire({
            title: '¡¡¡Escoge!!!',
            text: '¿Eres Trabajador o Cliente?',
            icon: 'question',
            confirmButtonColor: '#333',
            background: '#292929',
            color: '#fff',
            confirmButtonAriaLabel: 'Ok',
          })}
        }
        
        
    }
    const verficacion =(password, telefono, rolUser, dataR)=>{
        console.log("->",telefono.length , "" , telefono);
        console.log(rolUser);
        switch(rolUser){
            case 1:
                console.log("Cliente");
                if(password.length >= 5 && password.length <= 10 && telefono.length === 10) {
                    console.log("Hola");
                    postRC(dataR)
                }else{
                    if(password.length < 5 || password.length >10){
                        Swal.fire({
                            title: '¡¡¡Ten Cuidado!!!',
                            text: "! La Contresañe debe tener minimo 5 careteres y maximo 10 !",
                            icon: 'info',
                            confirmButtonColor: '#333',
                            background: '#292929',
                            color: '#fff',
                            confirmButtonAriaLabel: 'Ok',
                          })
                    }else{
                        if( telefono.length === 10){
                            Swal.fire({
                                title: '¡¡¡Ten Cuidado!!!',
                                text: "! El telefono no es valido por que tiene menos de 10 caracteres !",
                                icon: 'info',
                                confirmButtonColor: '#333',
                                background: '#292929',
                                color: '#fff',
                                confirmButtonAriaLabel: 'Ok',
                              })
                        }
                    }
                }
                break;
            case 2:
                console.log("esta aca");
                if(password.length >= 5 && password.length <= 10 && telefono.length === 10) {
                    postRT(dataR)
                }else{
                    if(password.length < 5 || password.length === 10){
                        Swal.fire({
                            title: '¡¡¡Ten Cuidado!!!',
                            text: "! La Contresañe debe tener minimo 5 careteres y maximo 10 !",
                            icon: 'info',
                            confirmButtonColor: '#333',
                            background: '#292929',
                            color: '#fff',
                            confirmButtonAriaLabel: 'Ok',
                          })
                    }else{
                        if( telefono.length < 10){
                            Swal.fire({
                                title: '¡¡¡Ten Cuidado!!!',
                                text: "! El telefono no es valido por que tiene menos de 10 caracteres !",
                                icon: 'info',
                                confirmButtonColor: '#333',
                                background: '#292929',
                                color: '#fff',
                                confirmButtonAriaLabel: 'Ok',
                              })
                        }
                    }
                }
                break;
        }
        
    }
    const postRC = (dataR) =>{
        console.log(dataR);
        axios.post('http://localhost:3000/api/register',dataR)
        .then(function (response) {
            console.log(response);
            alertRegistro()
            setTimeout(cargarP(),2000)
        })
        .catch(function (error) {
            console.log(error);
            Swal.fire({
                title: '¡¡¡Advertencia!!!',
                text: "!Este correo no esta disponible: " + dataR.Email+ "!",
                icon: 'error',
                confirmButtonColor: '#333',
                background: '#292929',
                color: '#fff',
                confirmButtonAriaLabel: 'Ok',
              })
        });
    }
    const alertRegistro = () =>{
        Swal.fire({
            title: '¡¡¡Felicitaciones!!!',
            text: "!Te has registrado con exito!",
            icon: 'success',
            confirmButtonColor: '#333',
            background: '#292929',
            color: '#fff',
            confirmButtonAriaLabel: 'Ok',
        })
    }
    const cargarP = ()=>{
        (window.location.reload(true))
    }
    const postRT = (dataR) =>{
        axios.post('http://localhost:3000/api/register',dataR)
        .then(function (response) {
            console.log(response);
            alertRegistro()
            setTimeout(cargarP(),3000)
        })
        
        .catch(function (error) {
            console.log(error);
            Swal.fire({
                title: '¡¡¡Advertencia!!!',
                text: "!Este correo no esta disponible: " + dataR.Email+ "!",
                icon: 'error',
                confirmButtonColor: '#333',
                background: '#292929',
                color: '#fff',
                confirmButtonAriaLabel: 'Ok',
              })
        });
    }

    function Mover(){
        const nuevoForm= document.querySelector(".nuevoForm")
        nuevoForm.classList.add("mostrarFormulario");
        nuevoForm.classList.remove("regresarFormulario");
        setMostrar(true)
    }

    function Regresar(){
        console.log(Mostrar);
        if(Mostrar){
            const nuevoForm= document.querySelector(".nuevoForm")
            nuevoForm.classList.remove("mostrarFormulario");
            nuevoForm.classList.add("regresarFormulario");
            setMostrar(false)
        }else{
            console.log("No esta");
        }
        
    }
    
  return (
    <div className='sliderlore'>
        <div className="containerform" id="container">
            <div className="form-container sign-up-container">
                <form action="#" className='formlr'>
                    <h1 className='h1form'>Crear Cuenta</h1>
                    <input type="email" placeholder="Gmail" id='remail' className='inputform'/>
                    <input type="text" placeholder="Nombres" id='rname' className='inputform'/>
                    <input type="text" placeholder="Apellidos" id='rapellido' className='inputform'/>
                    <input type="text" placeholder="Telefono" id='ruser' className='inputform'/>
                    <input type="password" placeholder="Contraseña" id='rpassword' className='inputform'/>
                    <div className="radiusB">
                        <input type="radio" name='decision' value="trabajador" id='trabajador' onChange={Mover} />
                        <label forHtml="trabajador" className="labelRadio">Trabajador</label>
                        <input type="radio" name='decision' value="cliente" id='cliente' onChange={Regresar} />
                        <label forHtml="cliente" className="labelRadio">Cliente</label>
                    </div>
                    <button className='buttonform' onClick={RegisterCliente}>Crear Cuenta</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#" className='formlr'>
                    <h1 className='h1form'>Iniciar Sesion</h1>
                    <input type="text" placeholder="Email" id='usname' className='inputform' value={datasL.Email} onChange={changeLogin} name="Email"/>
                    <input type="password" placeholder="Contraseña" id='uspassword' className='inputform'  value={datasL.Password} onChange={changeLogin} name="Password"/>
                    <a href="#" className='aform'>¿Olvidaste tu contraseña?</a>
                    <button className='buttonform' onClick={login}>Iniciar Sesion</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className='h1form'>¡Bienvenido de nuevo!</h1>
                        <p className='pform'>Para mantenerse conectado con nosotros, inicie sesión con su información personal</p>
                        <button className="ghost buttonform" onClick={change1}>Iniciar Sesion</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className='h1form'>¡Hola amig@!</h1>
                        <p className='pform'>Ingresa tus datos personales y comienza tu viaje con nosotros</p>
                        <button className="ghost buttonform" onClick={change2}>Crear Cuenta</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="nuevoForm formlr">
            <h1 className='h1form'>Datos Adicionales</h1>
            <input type="text" placeholder="Nombre del local" id='nomLocal' className='inputform'/>
            <input type="text" placeholder="Dirección del Local" id='direccionLocal' className='inputform'/>
            <select name="opciones" id="seleciona">
                {
                    categoria.map(items=>(
                        <option value={items.idCategoria}>{items.Nombre_cat}</option>
                    ))
                }
            </select>
        </div>
    </div>
  )
}
