import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import './AuthForm.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        // ... same registration logic
        try {
            await registerUser({ username, password });
            setSuccess('Registration successful! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data || 'Registration failed.');
        }
    };

    return (
        <div className="auth-page">
            <div className="brand-header">
                {/* Added emoji and new className for styling */}
                <h1 className="brand-title">🚀 FinTrack</h1>
            </div>

            <div className="auth-form-container">
                <form onSubmit={handleRegister}>
                    <h2>Create Account</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <button type="submit">Register</button>
                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>

            <div className="creator-footer">
                <p>Made by Atharv Iche</p>
            </div>
        </div>
    );
};

export default RegisterPage;