import React from 'react'

export const Inputs = ({  idI,types, place}) => {
  return (
    <input className="inputC" id={idI} type={types} placeholder={place}></input>
  )
}
