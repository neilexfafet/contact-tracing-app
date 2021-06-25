import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterUser() {
    toast.configure();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [required, setRequired] = useState('form-control');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('');
    const [bday, setBday] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [filename, setFilename] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatpwd, setRepeatpwd] = useState('');

    const fileInput = (e) => {
        setImage(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const registrationUser = async () => {
        setLoading(true);
        const formdata = new FormData();
        formdata.append('fname', fname);
        formdata.append('lname', lname);
        formdata.append('gender', gender);
        formdata.append('bday', bday);
        formdata.append('contact', contact);
        formdata.append('address', address);
        formdata.append('image', image);
        formdata.append('email', email);
        formdata.append('password', password);
        formdata.append('repeatpwd', repeatpwd);
        try {
            await api.userRegister(formdata).then(response => {
                if(response.data.success) {
                    console.log(response.data.success);
                    history.push('/');
                }
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
                    setRequired('form-control is-invalid');
                    setPassword('');
                    setRepeatpwd('');
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
                    setRepeatpwd('');
                }
            })
        } catch {
            alert('Error in CATCH');
        } finally {
            setLoading(false);
        }
    }

    const style = {
        minWidth: "360px",
        maxWidth: "960px",
        width: "600px"
    }

    return (
        <div className="hold-transitiion login-page">
            <div className="login-box" style={style}>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg"><strong>Register as User</strong></p>
                        <form>
                        <div class="row">
                            <div class="col-md-6">
                                <p className="login-box-msg">Personal Details</p>
                                <div class="input-group mb-3">
                                    <input 
                                        type="text"
                                        class={required} 
                                        placeholder="First Name"
                                        value={fname}
                                        onChange={e => {setFname(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input 
                                        type="text" 
                                        class={required} 
                                        placeholder="Last Name"
                                        value={lname}
                                        onChange={e => {setLname(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <select 
                                        className={required}
                                        defaultValue={gender}
                                        onChange={e => {setGender(e.target.value);setRequired('form-control')}}
                                    >   
                                        <option disabled selected value="">Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input 
                                        type="date" 
                                        className={required} 
                                        placeholder="Birth Date"
                                        value={bday}
                                        onChange={e => {setBday(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                        <span className="fas fa-calendar"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className={required} 
                                        placeholder="Contact No"
                                        value={contact}
                                        onChange={e => {setContact(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                        <span className="fas fa-phone"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className={required} 
                                        placeholder="Address"
                                        value={address}
                                        onChange={e => {setAddress(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                        <span className="fas fa-map"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div class="custom-file">
                                        <input 
                                            type="file" 
                                            class="custom-file-input"
                                            accept="image/*"
                                            onChange={fileInput}
                                        />
                                        <label class="custom-file-label">{filename ? filename : 'Image'}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <p className="login-box-msg">Login Details</p>
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
                                <div class="input-group mb-3">
                                    <input 
                                        type="password" 
                                        class={required}
                                        placeholder="Retype password" 
                                        value={repeatpwd}
                                        onChange={e => {setRepeatpwd(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center">
                            <div class="col-6">
                                <button 
                                    type="submit" 
                                    class="btn btn-primary btn-block"
                                    onClick={registrationUser}
                                    disabled={loading}
                                >{loading ? 'Loading...' : 'Register'}</button>
                            </div>
                        </div>
                        </form>
                        <p class="text-center pt-2">
                            Already have an account? <Link to="/" class="text-center">Login Here</Link><br/>
                            <Link to="/register/establishment">Register as an Establishment</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;

