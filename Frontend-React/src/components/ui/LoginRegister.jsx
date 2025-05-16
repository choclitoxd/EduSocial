import React,{useState, useContext} from "react";
import './css/LoginRegister.css';
import { AuthContext } from "../../context/AuthContext";
import { FaUser,FaLock,FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginRegister = () =>{

    const [action, setAction] = useState('');
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(loginEmail, loginPassword);
            navigate("/home"); // Redirige al home si login es exitoso
        } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
        }
    };

    const registerLink = () => {setAction('active');}
    const loginLink = () => {setAction('');}

    return(
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Email' required  value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        <FaLock className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remeber me</label>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button type="submit" onClick={handleLogin}>Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>
            <div className="form-box register">
                <form action="">
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Name' required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Email' required />
                        <FaEnvelope className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                        <FaLock className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>I agree to the termns & conditions</label>
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Alredy have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        
        </div>
        
        
    );
};
export default LoginRegister