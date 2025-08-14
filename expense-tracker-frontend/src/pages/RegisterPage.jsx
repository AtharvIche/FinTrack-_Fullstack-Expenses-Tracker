import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import './AuthForm.css'; // Imports the shared styles for our form

const RegisterPage = () => {
    // 1. State management for form inputs and messages
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // 2. Function to handle form submission
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError('');
        setSuccess('');

        try {
            // 3. Call the API service to register the user
            await registerUser({ username, password });
            setSuccess('Registration successful! Redirecting to login...');

            // 4. Redirect to the login page after 2 seconds for better UX
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            // 5. Handle errors from the API (e.g., username already taken)
            const errorMessage = err.response?.data || 'Registration failed. Please try again.';
            setError(errorMessage);
            console.error(err);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2>Register</h2>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Conditionally render error and success messages */}
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <button type="submit">Register</button>

                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;