import React from 'react'

export const ButtonsC = ({event, idI, text}) => {
  return (
    <button className="btnC"id={idI} onClick={event}>{text}</button>
  )
}
