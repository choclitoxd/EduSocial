import React, {useEffect, useState} from "react";
import "./css/profile.css";
import "./css/calificacion.css";
import axios  from "axios";
import Swal from "sweetalert2";
import { ModalConfirm } from "../IU/modalConfirm";
import emailjs from '@emailjs/browser';
import { ModalSubirImagen } from "../IU/modalSubirImagen";
export const Perfiles = () => {
  const [confirmM, setConfirmM] = useState(null)
  const [edit, setEdit] = useState(null)
  const [NombreC, setNombreC]=useState("")
  const [id,setId]=useState("")
  const [Token, setToken]=useState("")
  const [rol, setRol]=useState("")
  const [inputImagen,setInputImagen]=useState(null)
  const [datasEdit, setDatasEdit]=useState({
    "Nombres":"", 
    "Apellidos":"",
    "Telefono":"",
    "Email":"",
    "Password":"",
    "Rol":""})
 useEffect(()=>{
  const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser")
  if(loggedUserJSON){
    const users = JSON.parse(loggedUserJSON)
    llamadaDatos(users.userCliente.idCliente, users.token)
    console.log(users);
    setToken(users.token)
  }else{
    console.log("Mal");
  }
 },[])
 const UpdateCliente = ({target})=>{
  const {name , value} = target
  setDatasEdit({
            ...datasEdit, 
            [name]:value
        })
  console.log("->",datasEdit);
}
const previoUpdate = (e) => {
  e.preventDefault()
  setConfirmM(true)
}
const llamadaDatos = (ids, token) =>{
  console.log(token);
    axios.get('http://localhost:3000/api/cliente/' + ids, {headers : {
      "Authorization":`token ${token}`
    }
  })
    .then(function (response) {
      console.log(response);
      añadidos(response.data.data)
    });
}
 const update = () =>{
  axios.put('http://localhost:3000/api/cliente/'+ id ,datasEdit,{
    headers : {
      "Authorization":`token ${Token}`
    }
  } )
  .then(function (response) {
      console.log(response);
      Swal.fire({
        title: '¡¡¡Felicitaciones!!!',
        text: '¡ Tus datos se han subido correctamente !',
        icon: 'success',
        confirmButtonColor: '#333',
        background: '#292929',
        color: '#fff',
        confirmButtonAriaLabel: 'Ok',
      })
      enviarEdit()
  })
  .catch(function (error) {
      console.log(error);
      Swal.fire({
        title: '¡¡¡No se!!!',
        text: '¡ A sucedido un error intenta mas tarde !',
        icon: 'error',
        confirmButtonColor: '#333',
        background: '#292929',
        color: '#fff',
        confirmButtonAriaLabel: 'Ok',
      })
  });
  setConfirmM(false)
}
const enviarEdit = () =>{
  let dataMensaje = {"name":datasEdit.Nombres, "email":datasEdit.Email, "id":id, "rol":rol}
  emailjs.send("service_3ttevpo", "template_saf20yp",dataMensaje,"OZyZikHyRdk3lV1Zx")
      .then(response => console.log(response))
      .catch(error => console.log(error))
}
 const añadidos = (data) =>{
  console.log("1");
  const AñadidoDeNombres = data.Nombres + " " + data.Apellidos
  const nombre =  data.Nombres
  setRol(data.Rol)
  setNombreC(AñadidoDeNombres)
  setId(data.idCliente)
  setDatasEdit({Nombres:data.Nombres, Apellidos:data.Apellidos, Telefono:data.Telefono,  Password:data.Password, Rol:data.Rol, Email:data.Email})
  console.log(typeof nombre);
}
function Editar(){
  const chequear=document.getElementById("flexSwitchCheckDefault").checked;
  const info1=document.getElementById("info1")
  const info2=document.getElementById("info2")
  const info3=document.getElementById("info3")
  const info6=document.getElementById("info6")
  const infoInput1=document.getElementById("infoInput1")
  const infoInput2=document.getElementById("infoInput2")
  const infoInput3=document.getElementById("infoInput3")
  const infoInput6=document.getElementById("infoInput6")
  if(chequear){
    info1.style.display="none"
    info2.style.display="none"
    info3.style.display="none"
    info6.style.display="none"
    infoInput1.style.display="block"
    infoInput2.style.display="block"
    infoInput3.style.display="block"
    infoInput6.style.display="block"
    setEdit(true)
    
  }else{
    
    info1.style.display="block"
    
    info2.style.display="block"
    
    info3.style.display="block"
    info6.style.display="block"
    infoInput1.style.display="none"
    infoInput2.style.display="none"
    infoInput3.style.display="none"
    infoInput6.style.display="none"
    setEdit(false)
  }
}
const subirImagen = ()=>{
  setInputImagen(true)
}

const files = (file) =>{
  if(!file){
      Swal.fire({
          title: '¡¡¡No se!!!',
          text: '¡ A sucedido un error intenta mas tarde !',
          icon: 'error',
          confirmButtonColor: '#333',
          background: '#292929',
          color: '#fff',
          confirmButtonAriaLabel: 'Ok',
        })
  }else{
  Array.from(file).forEach(files=>{
    var reader=new FileReader()
    reader.readAsDataURL(files)
    reader.onload=function(){
      var base64 = reader.result;
      putImagen(base64)
    }
  })}  
  
}
const putImagen = (file)=>{
  axios.put('http://localhost:3000/api/trabajador/' + id, {"Foto":file})
    .then(function (response) {
      console.log(response);
      Swal.fire({
        title: '¡¡¡Felicitaciones!!!',
        text: '¡ Tus datos se han subido correctamente !',
        icon: 'success',
        confirmButtonColor: '#333',
        background: '#292929',
        color: '#fff',
        confirmButtonAriaLabel: 'Ok',
      })
      enviarEdit()
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        title: '¡¡¡No se!!!',
        text: '¡ A sucedido un error intenta mas tarde !',
        icon: 'error',
        confirmButtonColor: '#333',
        background: '#292929',
        color: '#fff',
        confirmButtonAriaLabel: 'Ok',
      })
    });
}
console.log(datasEdit);
  return (
    <div className="container">
      <div className="main-body">
        <div className="row cardsP gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="cardP cardP-body">
                <div className="d-flex flex-column align-items-center text-center">
                  {
                    inputImagen &&(
                      <ModalSubirImagen salir={() => setConfirmM(false)} files={files}/>
                      )
                  }
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4>{NombreC}</h4>
                    <p className="text-secondary mb-1">{datasEdit.Rol}</p>
                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                    <div className="btnActivateM">
                      <label class="switch">
                        <input type="checkbox" checked/>
                        <span className="sliderP"></span>
                      </label>
                      <button className="btn btnM btn-outline-primary">
                        Mensaje
                      </button>
                    </div> 
                  </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush" id="cambioCard">{/*Aqui hay algo innecesario   wh*/}
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 wh">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bibi-whatsapp iconsM" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                    WhatsApp
                  </h6>
                  <span className="text-secondary">{datasEdit.Telefono}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 wh">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-envelope iconsM" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                    Email
                  </h6>
                  <span className="text-secondary">{datasEdit.Email}</span>
                </li>
                {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-facebook mr-2 icon-inline text-primary"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    Facebook
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li> */}
                {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <form className="clasificacionF">
                    <p className="clasificacion">
                      <input id="radio1" type="radio" name="estrellas" value="5" />
                      <label for="radio1">★</label>
                      <input id="radio2" type="radio" name="estrellas" value="4" />
                      <label for="radio2">★</label>
                      <input id="radio3" type="radio" name="estrellas" value="3" />
                      <label for="radio3">★</label>
                      <input id="radio4" type="radio" name="estrellas" value="2" />
                      <label for="radio4">★</label>
                      <input id="radio5" type="radio" name="estrellas" value="1" />
                      <label for="radio5">★</label>
                    </p>
                    <h6 className="mb-0">4.5</h6>
                  </form>
                </li> */}
              </ul>
            </div>
          </div>
          {
            confirmM && (
              <ModalConfirm salir={() => setConfirmM(false)} guardar={update} />
            )
          }
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                
              <div className="row">
                  <h4 className="col-sm-3 mb-0 alturaTamano">Nombre(s)</h4>
                  <div  className="col-sm-9">
                    <p className="col-sm-9 text-secondary alturaTamano" id="info1">{datasEdit.Nombres}</p>
                    <input type="text" className="form-control" id="infoInput1" placeholder={datasEdit.Nombres} name="Nombres" value={datasEdit.Nombres} onChange={UpdateCliente}/>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <h4 className="col-sm-3 mb-0 alturaTamano">Apellido(s)</h4>
                  <div  className="col-sm-9">
                    <p className="col-sm-9 text-secondary alturaTamano" id="info6">{datasEdit.Apellidos}</p>
                    <input type="text" className="form-control" id="infoInput6" value={datasEdit.Apellidos} name="Apellidos" placeholder={datasEdit.Apellidos} onChange={UpdateCliente} />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <h4 className="col-sm-3 mb-0 alturaTamano">E-mail</h4>
                  <div  className="col-sm-9">
                    <p className="col-sm-9 text-secondary alturaTamano" id="info2">{datasEdit.Email}</p>
                    <input type="text" className="form-control col-sm-9" id="infoInput2" placeholder={datasEdit.Email} name="Email" value={datasEdit.Email} onChange={UpdateCliente}/>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <h4 className="col-sm-3 mb-0 alturaTamano">Número de Celular</h4>
                  <div  className="col-sm-9">
                    <p className="col-sm-9 text-secondary alturaTamano" id="info3">{datasEdit.Telefono}</p>
                    <input type="text" className="form-control col-sm-9" id="infoInput3" placeholder={datasEdit.Telefono} name="Telefono"value={datasEdit.Telefono} onChange={UpdateCliente}/>
                  </div>
                </div>
                <div className="row-2 filaEditar" id="row-2">
                  {/* <a className="col-sm-1 btn btn-info" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">
                    Edit
                  </a> */}
                  <div className="col-10 form-check form-switch ">
                      <input className="col-2 form-check-input align-self-center" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={Editar} />
                      <label className="col-10 form-check-label align-self-center pt-2" forHtml="flexSwitchCheckDefault">Editar</label>
                  </div>
                  {edit && (
                    <button className="col-2 cssbuttons-io-button align-self-end" onClick={previoUpdate}><span>
                      Guardar
                    </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div class="col-lg-14 col-xl-14">
              <div class="cardP-box">
                <div class="tab-content"> {/*Puede no importar*/}
                  <div class="tab-pane show active" id="about-me">  
                    <ul class="list-unstyled timeline-sm">
                      <li class="timeline-sm-item">
                        <span class="timeline-sm-date">2015 - 19</span>
                        <h5 class="mt-0 mb-1">Lead designer / Developer</h5>
                        <p>websitename.com</p>
                        <p className="text-muted mt-2">Everyone realizes why a new common language
                          would be desirable: one could refuse to pay expensive translators.
                          To achieve this, it would be necessary to have uniform grammar,
                          pronunciation and more common words.</p>
                      </li> 
                    </ul>
                  </div>
                  <div class="tab-pane show active day-2" id="about-me">  
                    <ul class="list-unstyled timeline-sm">
                      <li class="timeline-sm-item">
                        <span class="timeline-sm-date">2015 - 19</span>
                        <h5 class="mt-0 mb-1">Lead designer / Developer</h5>
                        <p>websitename.com</p>
                        <p className="text-muted mt-2">Everyone realizes why a new common language
                          would be desirable: one could refuse to pay expensive translators.
                          To achieve this, it would be necessary to have uniform grammar,
                          pronunciation and more common words.</p>
                      </li> 
                    </ul>
                  </div>
                  <div class="tab-pane show active" id="about-me">  
                    <ul class="list-unstyled timeline-sm">
                      <li class="timeline-sm-item">
                        <span class="timeline-sm-date">2015 - 19</span>
                        <h5 class="mt-0 mb-1">Lead designer / Developer</h5>
                        <p>websitename.com</p>
                        <p className="text-muted mt-2">Everyone realizes why a new common language
                          would be desirable: one could refuse to pay expensive translators.
                          To achieve this, it would be necessary to have uniform grammar,
                          pronunciation and more common words.</p>
                      </li> 
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
