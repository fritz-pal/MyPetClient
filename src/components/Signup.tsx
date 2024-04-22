import React, { useContext, useState } from 'react';
import './css/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from './Loader';
import { AuthContext, AuthState } from '../context/AuthContext';
import { AuthAPI, RegisterData } from '../models/Auth';
import { useTranslation } from 'react-i18next';

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
    const { validateSession, state } = useContext(AuthContext);
    const [t,] = useTranslation("signup");

    const userMutation = useMutation({
        mutationFn: (user: RegisterData) => AuthAPI.register(user),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ["users"] });
                validateSession();
                if (state == AuthState.Failed) navigate('/login');
            } else {
                if (data.errorMessage === "UsernameTaken") setUsernameError(t("usernameTaken"));
                else if (data.errorMessage === "EmailTaken") setEmailError(t("emailTaken"));
            }
        },
        onError: (error) => {
            console.log('Error adding user:', error);
        }
    })

    const updateErrors = (set: React.Dispatch<React.SetStateAction<string>>, value: string, isError: boolean, errorMessage: string): boolean => {
        if (!value) {
            set(t("required"));
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
        return updateErrors(setUsernameError, value, value.length < 3, t("usernameLength"));
    };

    const checkEmail = (value: string) => {
        return updateErrors(setEmailError, value, !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)), t("invalidEmail"));
    };

    const checkPassword = (value: string) => {
        if (confirmPassword) checkConfirmPassword(confirmPassword);
        return updateErrors(setPasswordError, value, !(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)), t("passwordRequirements"));
    }

    const checkConfirmPassword = (value: string) => {
        return updateErrors(setConfirmPasswordError, value, value !== password, t("passwordMatch"))
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isValid = true;
        if (!checkUserName(username)) isValid = false;
        if (!checkEmail(email)) isValid = false;
        if (!checkPassword(password)) isValid = false;
        if (!checkConfirmPassword(confirmPassword)) isValid = false;
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
            <h1>{t("signup")}</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">{t("name")}</label>
                    <input
                        type="text"
                        name="username"
                        className={`signup-input ${usernameError && `signup-input-error`}`}
                        maxLength={32}
                        value={username}
                        onBlur={(e) => checkUserName(e.target.value)}
                        onChange={(e) => setUsername(e.target.value.trim())}
                    />
                    {usernameError && <p className="error">{usernameError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">{t("email")}</label>
                    <input
                        type="email"
                        name="email"
                        className={`signup-input ${emailError && `signup-input-error`}`}
                        value={email}
                        onBlur={(e) => checkEmail(e.target.value)}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">{t("password")}</label>
                    <input
                        type="password"
                        name="password"
                        className={`signup-input ${passwordError && `signup-input-error`}`}
                        value={password}
                        onBlur={(e) => checkPassword(e.target.value)}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">{t("passwordRepeat")}</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className={`signup-input ${confirmPasswordError && `signup-input-error`}`}
                        value={confirmPassword}
                        onBlur={(e) => checkConfirmPassword(e.target.value)}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (<p className="error">{confirmPasswordError}</p>)}
                </div>
                <div className="form-group">
                    <label htmlFor="fullname">{t("fullname")}</label>
                    <input
                        name="fullname"
                        className="signup-input"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder={"(" + t("optional") + ")"}
                    />
                </div>
                <div className='button-container'>
                    <button type="submit">{userMutation.isPending ? <Loader /> : t("signup")}</button>
                </div>
            </form>
            <div className="loginQuestion">
                {t("account")} <Link to="/login">{t("login")}</Link>
            </div>
        </div>
    );
}

export default SignUp;