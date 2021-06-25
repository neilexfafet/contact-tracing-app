import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    toast.configure();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [required, setRequired] = useState('form-control');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    if(localStorage.getItem('userAuth')) {
        history.push('/home')
    }

    const loginUser = async () => {
        setLoading(true);
        try {
            await api.login({
                email, password
            }).then(response => {
                if(response.data.error) {
                    toast.error(response.data.error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setRequired('form-control is-invalid')
                    setPassword('');
                }
                if(response.data.failed) {
                    toast.error(response.data.failed, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setPassword('');
                }
                if(response.data.success) {
                    localStorage.setItem('userAuth', response.data.token);
                    history.push('/home');
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
        } catch {
            console.log('ERROR CATCH')
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="hold-transitiion login-page">
            <div className="login-box">
                <div class="login-logo">
                    <b>Contact-Tracing App</b>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <form>
                        <p class="login-box-msg">Sign in to start your session</p>
                        <div className="input-group mb-3">
                            <input 
                                type="email" 
                                className={required} 
                                placeholder="Email"
                                value={email}
                                onChange={e => {setEmail(e.target.value);setRequired('form-control')}}
                                required
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input 
                                type="password" 
                                class={required} 
                                placeholder="Password"
                                value={password}
                                onChange={e => {setPassword(e.target.value);setRequired('form-control')}}
                                required
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div class="col-6">
                                <button 
                                    type="submit" 
                                    class="btn btn-primary btn-block"
                                    onClick={loginUser}
                                    disabled={loading}
                                >{loading ? 'Signing In...' : 'Login'}</button>
                            </div>
                        </div>
                        </form>
                        <p class="text-center pt-2">
                            Dont have an account? <br/><Link to="/register/user" class="text-center">Register Here as User</Link> 
                            <br/><Link to="/register/establishment"> Register here as an Establishment</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

