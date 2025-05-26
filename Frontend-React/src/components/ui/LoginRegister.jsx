import React,{useState, useContext} from "react";
import './css/LoginRegister.css';
import { AuthContext } from "../../context/AuthContext";
import { FaUser,FaLock,FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginRegister = () =>{
    const [action, setAction] = useState('');
    const { loginUser, registerUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Estados para login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Estados para registro
    const [registerData, setRegisterData] = useState({
        nombre: '',
        correo: '',
        contrasena: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(loginEmail, loginPassword);
            navigate("/"); // Redirige al home si login es exitoso
        } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(registerData);
            alert("Registro exitoso!");
            navigate("/");
        } catch (error) {
            alert("Error al registrar: " + error.message);
        }
    };

    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const registerLink = () => {setAction('active');}
    const loginLink = () => {setAction('');}

    return(
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form action="" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder='Email' 
                            required  
                            value={loginEmail} 
                            onChange={(e) => setLoginEmail(e.target.value)} 
                        />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder='Password' 
                            required 
                            value={loginPassword} 
                            onChange={(e) => setLoginPassword(e.target.value)} 
                        />
                        <FaLock className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remeber me</label>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>
            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            name="nombre"
                            placeholder='Name' 
                            required 
                            value={registerData.nombre}
                            onChange={handleRegisterInputChange}
                        />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input 
                            type="email" 
                            name="correo"
                            placeholder='Email' 
                            required 
                            value={registerData.correo}
                            onChange={handleRegisterInputChange}
                        />
                        <FaEnvelope className='icon'/>
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            name="contrasena"
                            placeholder='Password' 
                            required 
                            value={registerData.contrasena}
                            onChange={handleRegisterInputChange}
                        />
                        <FaLock className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" required/>I agree to the terms & conditions</label>
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;