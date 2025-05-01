import React from 'react'
import imgc from "../../../src/components/img/fondo/motilar.jpg"
export const Aboutus = () => {
  return (
    <div id="page-content-wrapper">	
		    <div className="section wb">
			    <div className="container">
				    <div className="row align-items-center">
					    <div className="col-md-6 text-left">
                            <div className="message-box">
                                <h4 className='textH4'>Acerca De Nosotros</h4>
                                <h2 className='textH2'>Bienvenidos a BARBERSERVER</h2>
                                <p className="lead">Desde la niñez muchos hombres y mujeres han asistido a un barbero o peluquero, de hecho, es algo que ya tiene mucho tiempo, la metodología de asignar una hora para una cita y tener una relación cliente-barbero siempre ha sido la misma, por un cuaderno o una agenda, o ya en la actualidad por medio de las redes sociales.</p>
                                <p className='textAbout'> BarberSever es un software encargado de darle un orden a las citas y horarios de los cortes, ya sea en una barbería o en una peluquería, también se encarga de mejorar el servicio con los clientes de las barberías ya que este sistema es necesario para muchos emprendedores dueños de barberías y peluquerías que quieren tener una nueva metodología de pedido y asignación de citas para un corte de cabello.</p>
                            </div>
					    </div>
					<div className="col-md-6 text-center">
						<div className="right-box">
							<img className="img-fluid" src={imgc} alt="AGZ" />
						</div>
					</div>
				</div>
				
				<hr className="hr1"/> 
				
				<div className="row">
					<div className="col-md-12">
						<div className="about-tab">
							<ul className="nav nav-pills nav-justified" id="myTab" role="tablist">
								<li className="nav-item"><a className="nav-link active" href="#tab_a" data-toggle="tab">Nuestra Misión</a></li>
								<li className="nav-item"><a className="nav-link" href="#tab_b" data-toggle="tab">Por Qué Nosotros</a></li>
								<li className="nav-item"><a className="nav-link" href="#tab_c" data-toggle="tab">Alcance</a></li>								
							</ul>
							<div className="tab-content">
								<div className="tab-pane fade show active" id="tab_a">
									<p>BarberServer tiene como objetivo mejorar la relación entre un cliente y un barbero o peluquero, mediante una mejor, sencilla y rápida forma de pedir una cita por medio del ya mencionado (principalmente) sistema web, además de beneficiar de forma eficiente a ambas partes con respecto al tiempo y la organización, aspectos los cuales también se buscan primordialmente con este sistema.</p>
								</div>
								<div className="tab-pane fade" id="tab_b">
									<p>BarberServer es un software que tendrá una agenda online que funciona como un ERP para pymes. Es versátil, puede funcionar cómo agenda para tus citas para corte de cabello en tu peluquería o barbería, y esto es lo que va mejorar la relación con tus clientes. Este software te llevará a tener un mejor orden con los horarios de las citas de tus clientes y ese factor es el que te va a dar reconocimiento por parte de la comunidad. Los usuarios que se registren tendrán ciertos beneficios sobre los usuarios comunes o libres ya que a estos se les guardará sus datos tanto personales como dentro de la página, como lo son las citas.</p>
									<ul>
										<li><i className="fa fa-circle-o" aria-hidden="true"></i>Experiencia del usuario</li>
										<li><i className="fa fa-circle-o" aria-hidden="true"></i>Dispositivos completos</li>
										<li><i className="fa fa-circle-o" aria-hidden="true"></i>Diseño impresionante</li>
										<li><i className="fa fa-circle-o" aria-hidden="true"></i>Impacto visual</li>
										<li><i className="fa fa-circle-o" aria-hidden="true"></i>100% sincronizado</li>
										<li><i className="fa fa-circle-o" aria-hidden="true"></i>Soporte personalizado	</li>
									</ul>
								</div>
								<div className="tab-pane fade" id="tab_c">
									<p>BarberServer va a tener una página web con un programa para ordenador y otro para dispositivos móviles, también se espera que esta última se encuentre en la mayoría de todas las tiendas de aplicaciones tanto para Android como para IOS, también el sistema se va a extender principalmente por las principales ciudades del departamento del Quindío y en un futuro se piensa expandir por todo territorio nacional.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}
