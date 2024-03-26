import { useState } from 'react';
import '../App.css';

const LoginInput = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };
    console.log('Username:', username);

    return (
        <form className="login-inputs" onSubmit={handleSubmit}>
            <div className="input-container">
                <label htmlFor="username">Username:</label>
                <input name="username" placeholder="Enter your username" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="password">Password:</label>
                <input name="password" placeholder="Enter your password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="login-button" type="submit">Login</button>
        </form>
    );
};

export default LoginInput;