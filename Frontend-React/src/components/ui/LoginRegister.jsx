import React,{useState, useContext} from "react";
import './css/LoginRegister.css';
import { AuthContext } from "../../context/AuthContext";
import { FaUser,FaLock,FaEnvelope,FaDatabase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginRegister = () =>{
    const [action, setAction] = useState('');
    const { loginUser, registerUser, loadTestUsers, loadTestPosts, postSuggestedUsers } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
        setError('');
        try {
            const response = await loginUser(loginEmail, loginPassword);
            
            // Obtener sugerencias después del login exitoso
            try {
                await postSuggestedUsers();
            } catch (suggestionError) {
                console.error('Error al cargar sugerencias:', suggestionError);
            }
            
            // Verificar si es el usuario administrador
            if (loginEmail === 'admin@uq.com') {
                navigate("/moderator/reports"); // Redirige a la vista de moderador
            } else {
                navigate("/"); // Redirige al home para usuarios normales
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await registerUser(registerData);
            
            // Obtener sugerencias después del registro exitoso
            try {
                await postSuggestedUsers();
            } catch (suggestionError) {
                console.error('Error al cargar sugerencias:', suggestionError);
            }
            
            // Si el registro es exitoso, el usuario ya estará autenticado
            if (registerData.correo === 'admin@uq.com') {
                navigate("/moderator/reports");
            } else {
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loadTestData = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Cargar usuarios de prueba
            const usersMessage = await loadTestUsers();
            console.log("Usuarios:", usersMessage);
            
            // Cargar posts de prueba
            const postsMessage = await loadTestPosts();
            console.log("Posts:", postsMessage);

            alert(`${usersMessage}\n${postsMessage}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const registerLink = () => {setAction('active');}
    const loginLink = () => {setAction('');}

    return(
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form action="" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {error && <div className="error-message">{error}</div>}
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
                    <button 
                        type="button" 
                        className="load-test-data" 
                        onClick={loadTestData}
                        disabled={isLoading}
                    >
                        <FaDatabase className="test-data-icon" />
                        {isLoading ? 'Cargando datos...' : 'Cargar Datos de Prueba'}
                    </button>
                </form>
            </div>
            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    {error && <div className="error-message">{error}</div>}
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