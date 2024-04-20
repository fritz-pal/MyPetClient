import React, { useContext, useState } from 'react';
import './css/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from './Loader';
import { AuthContext, AuthState } from '../context/AuthContext';
import { AuthAPI, RegisterData } from '../models/Auth';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {validateSession, state} = useContext(AuthContext);

    const userMutation = useMutation({
        mutationFn: (user: RegisterData) => AuthAPI.register(user),
        onSuccess: () => {
            console.log('User added successfully');
            queryClient.invalidateQueries({ queryKey: ["users"] });
            validateSession();
            if(state == AuthState.Failed) navigate('/login');
        },
        onError: (error) => {
            console.log('Error adding user:', error);
        }
    })

    const updateErrors = (set: React.Dispatch<React.SetStateAction<string>>, value: string, isError: boolean, errorMessage: string): boolean => {
        if (!value) {
            set('This field is required.');
            return false;
        }
        if (isError) {
            set(errorMessage)
            return false;
        } else {
            set('');
        }
        return true;
    };

    const checkUserName = (value: string): boolean => {
        return updateErrors(setUsernameError, value, value.length < 3, 'Username must be at least 3 characters long.');
    };

    const checkEmail = (value: string) => {
        return updateErrors(setEmailError, value, !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)), 'Invalid email address.');
    };

    const checkPassword = (value: string) => {
        if (confirmPassword) checkConfirmPassword(confirmPassword);
        return updateErrors(setPasswordError, value, !(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)), 'Password must be at least 8 characters long and contain at least one number and uppercase letter.');
    }

    const checkConfirmPassword = (value: string) => {
        return updateErrors(setConfirmPasswordError, value, value !== password, 'Passwords do not match.')
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isValid = true;
        if(!checkUserName(username)) isValid = false;
        if(!checkEmail(email)) isValid = false;
        if(!checkPassword(password)) isValid = false;
        if(!checkConfirmPassword(confirmPassword)) isValid = false;
        if (!isValid) return;

        userMutation.mutate({
            username: username,
            fullname: fullname,
            password: password,
            email: email
        });
    };

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        className={`signup-input ${usernameError && `input-error`}`}
                        maxLength={32}
                        value={username}
                        onBlur={(e) => checkUserName(e.target.value)}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && <p className="error">{usernameError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        className={`signup-input ${emailError && `input-error`}`}
                        value={email}
                        onBlur={(e) => checkEmail(e.target.value)}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className={`signup-input ${passwordError && `input-error`}`}
                        value={password}
                        onBlur={(e) => checkPassword(e.target.value)}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className={`signup-input ${confirmPasswordError && `input-error`}`}
                        value={confirmPassword}
                        onBlur={(e) => checkConfirmPassword(e.target.value)}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (<p className="error">{confirmPasswordError}</p>)}
                </div>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        name="fullname"
                        className="signup-input"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder='(Optional)'
                    />
                </div>
                <button type="submit">{userMutation.isPending ? <Loader /> : "Sign up"}</button>
            </form>
            <div className="loginQuestion">
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </div>
    );
}

export default SignUp;