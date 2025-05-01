import React from "react";
export const ModalConfirm = ({salir, guardar})=>{
    const save = () =>{
        guardar()
    }
    const salida = () =>{
        salir()
    }
    return(
        <div className="modal modalC" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Seguro</h5>
                </div>
                <div className="modal-body">
                    <p>Quieres guardar los siguientes cambios.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={save}>Save changes</button>
                    <button type="button" className="btn btn-secondary" onClick={salida}>Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}