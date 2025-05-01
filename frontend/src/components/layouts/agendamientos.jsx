import React,{useState} from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import'./css/calendario.css'
export const Agendamientos = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendario">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}