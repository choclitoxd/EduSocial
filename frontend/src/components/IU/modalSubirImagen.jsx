import React, {useState} from "react";
import Swal from "sweetalert2";
export const ModalSubirImagen = ({salir, files})=>{
    const [file, setfile] = useState(null)
    const imagen = (e) =>{
        setfile(e.target.files);
        // save()
    }   
    
    const salida = () =>{
        salir()
    }
    return(
        <div className="modal modalC" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Hola Quieres Subir una imagen</h5>
                </div>
                <div className="modal-body">
                    <input onChange={imagen} type="file" class="form-control" aria-label="Amount (to the nearest dollar)"/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={()=>files(file)}>Save changes</button>
                    <button type="button" className="btn btn-secondary" onClick={salida}>Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}