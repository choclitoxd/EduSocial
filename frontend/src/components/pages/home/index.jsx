import React from "react"
import '../../IU//css/style.css'
import { Header} from "../../layouts/header"
import { Slider} from "../../layouts/slider"
import { Footer } from "../../layouts/footer";
import { MainHome } from "../../layouts/MainHome";
export const Home = () => {
    return(
        <div className="main">
            <Header/>
            <Slider className="md=w-16 justify-center" classT="slider" text="EL SITIO WEB DE LOS BARBEROS"/>
            <Footer/>
            <MainHome/>
        </div>
    )
}