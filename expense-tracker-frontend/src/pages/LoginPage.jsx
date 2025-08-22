import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import './AuthForm.css';

const LoginPage = () => {
    const { setUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser({ username: decoded.sub });
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="auth-page">
            <div className="brand-header">
                {/* 1. Added emoji and new className for styling */}
                <h1 className="brand-title">🚀 FinTrack</h1>
            </div>

            <div className="auth-form-container">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        {/* 2. New container for password input and icon */}
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle input type
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* 3. Clickable icon to toggle password visibility */}
                            <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                    <p>
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </form>
            </div>

            <div className="creator-footer">
                <p>Made by Atharv Iche</p>
            </div>
        </div>
    );
};

export default LoginPage;