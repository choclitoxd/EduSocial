import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import'../layouts/css/calendario.css'

export const Calendario = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Calendar onChange={onChange} value={value} />
  )
}
