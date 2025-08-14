import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PromoPanel from '../components/PromoPanel';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import './AuthForm.css';

const LoginPage = () => {
    const { setUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser({ username: decoded.sub });
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password.');
            console.error(err);
        }
    };

    return (
        <div className="auth-page">
             <PromoPanel />
            <div className="auth-promo-panel">
                {/* You can add an illustration image here */}
                {/* <img src="/path/to/your/illustration.svg" alt="Login Illustration" /> */}
            </div>
            <div className="auth-form-panel">
                <form className="auth-form" onSubmit={handleLogin}>
                    <h2>Hello!</h2>
                    <p className="subtitle">Sign In to Get Started</p>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                    <div className="extra-links">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;