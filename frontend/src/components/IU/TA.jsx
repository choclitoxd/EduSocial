import React from 'react'

export const TA = ({idI, types, place, rowSC}) => {
  return (
    <textarea className="textareaC"id={idI} type={types} placeholder={place} rows={rowSC}></textarea>
  )
}
