import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Modal, Tabs, Tab } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api';
import SideProfile from './SideProfile';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
import "@reach/combobox/styles.css";
import moment from "moment";
import { format } from 'url';

function Profile() {
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [ready, setReady] = useState(true);
    const [required, setRequired] = useState('form-control');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [detailsId, setDetailsId] = useState('');
    const [companyName, setCompanyName] = useState('');
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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatpwd, setRepeatpwd] = useState('');
    
    const fileInput = (e) => {
        setImage(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    useEffect(() => {
        api.getAuth().then(response => {
            setId(response.data.id);
            setEmail(response.data.email);
            setDetailsId(response.data.details_id);
            setRole(response.data.role);
            api.getAuthDetails(response.data.id).then(res => {
                setCompanyName(res.data.company_name)
                setFname(res.data.first_name);
                setLname(res.data.last_name);
                setGender(res.data.gender);
                setBday(res.data.birth_date);
                setContact(res.data.contact_no);
                setAddress(res.data.address);
                setReady(false);
            });
        });
    }, []);

    const updateDetails = async () => {
        setLoader(true);
        const formdata = new FormData();
        formdata.append('id', detailsId);
        formdata.append('fname', fname);
        formdata.append('lname', lname);
        formdata.append('gender', gender);
        formdata.append('bday', bday);
        formdata.append('contact', contact);
        formdata.append('address', address);
        formdata.append('image', image);
        try {
            await api.updateDetailsUser(formdata).then(res => {
                if(res.data.success) {
                    toast.success(res.data.success, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if(res.data.error) {
                    toast.error(res.data.error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setRequired('form-control is-invalid');
                }
            })
        } catch {
            console.log('ERROR CATCH');
        } finally {
            setLoader(false);
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setRepeatpwd('');
        }
    }

    const updateDetailsEstablishment = async () => {
        setLoader(true);
        const formdata = new FormData();
        formdata.append('id', detailsId);
        formdata.append('name', companyName)
        formdata.append('fname', fname);
        formdata.append('lname', lname);
        formdata.append('contact', contact);
        formdata.append('address', address);
        formdata.append('image', image);
        try {
            await api.updateDetailsEstablishment(formdata).then(res => {
                if(res.data.success) {
                    toast.success(res.data.success, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if(res.data.error) {
                    toast.error(res.data.error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setRequired('form-control is-invalid');
                }
            })
        } catch {
            console.log('ERROR CATCH');
        } finally {
            setLoader(false);
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setRepeatpwd('');
        }
    }

    const updateLogin = async () => {
        setLoader(true);
        try {
            await api.updateLoginUser({id, email, confirmPassword}).then(res => {
                if(res.data.success) {
                    toast.success(res.data.success, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if(res.data.error) {
                    toast.error(res.data.error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setRequired('form-control is-invalid');
                }
            })
        } catch {
            console.log('ERROR CATCH');
        } finally {
            setLoader(false);
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setRepeatpwd('');
        }
    }

    const updatePassword = async () => {
        setLoader(true);
        try {
            await api.updatePasswordUser({id, password, newPassword, repeatpwd}).then(res => {
                if(res.data.success) {
                    toast.success(res.data.success, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if(res.data.error) {
                    toast.error(res.data.error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setRequired('form-control is-invalid');
                }
            })
        } catch {
            console.log('ERROR CATCH')
        } finally {
            setLoader(false);
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setRepeatpwd('')
        }
    }

    if(!role) {
        return (
            <span></span>
        )
    }
    if(role == "establishment") {
        return (
            <div className="card card-outline card-primary">
                <div className="card-header">
                    <Link to="/home" className="btn btn-primary mr-2">History</Link>
                    <Link to="/announcement" className="btn btn-primary mr-2">Announcement</Link>
                    <Link to="/myqrcode" className="btn btn-primary mr-2">My QR Code</Link>
                    <Link to="/scanqrcode" className="btn btn-primary mr-2">Scan QR Code</Link>
                    <button className="btn btn-primary disabled mr-2">My Profile</button>
                </div>
                <div className="card-body">
                    <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
                        <Tab eventKey="details" title="Personal Details">
                            <div className="form-group pt-4">
                                <label>First Name (owner)</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={fname}
                                    onChange={e => {setFname(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name (owner)</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={lname}
                                    onChange={e => {setLname(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company Name</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={companyName}
                                    onChange={e => {setCompanyName(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact No</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={contact}
                                    onChange={e => {setContact(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <div className="input-group mb-3">
                                    <div class="custom-file">
                                        <input 
                                            type="file" 
                                            class="custom-file-input"
                                            accept="image/*"
                                            onChange={fileInput}
                                        />
                                        <label class="custom-file-label">{filename ? filename : 'Upload Image'}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={address}
                                    onChange={e => {setAddress(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="row pt-4">
                                <div className="d-flex justify-content-end col-md-12">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={updateDetailsEstablishment}
                                        disabled={loader}
                                    >
                                        {loader ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="login" title="Login Details">
                            <div className="form-group pt-4">
                                <label>E-Mail</label>
                                <input 
                                    type="email" 
                                    className={required}
                                    value={email}
                                    onChange={e => {setEmail(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input 
                                    type="password" 
                                    className={required}
                                    value={confirmPassword}
                                    onChange={e => {setConfirmPassword(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="row pt-4">
                                <div className="d-flex justify-content-end col-md-12">
                                    <button
                                        className="btn btn-primary"
                                        onClick={updateLogin}
                                        disabled={loader}
                                    >
                                        {loader ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="password" title="Change Password">
                            <div className="form-group pt-4">
                                <label>Current Password</label>
                                <input 
                                    type="password" 
                                    className={required}
                                    value={password}
                                    onChange={e => {setPassword(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input 
                                    type="password" 
                                    className={required}
                                    value={newPassword}
                                    onChange={e => {setNewPassword(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Repeat New Password</label>
                                <input 
                                    type="password" 
                                    className={required}
                                    value={repeatpwd}
                                    onChange={e => {setRepeatpwd(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="row pt-4">
                                <div className="d-flex justify-content-end col-md-12">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={updatePassword}
                                        disabled={loader}
                                    >
                                        {loader ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    } 
    if(role == "user") {
        return (
            <div className="card card-outline card-primary">
                <div className="card-header">
                    <Link to="/home" className="btn btn-primary mr-2">History</Link>
                    <Link to="/myqrcode" className="btn btn-primary mr-2">My QR Code</Link>
                    <Link to="/scanqrcode" className="btn btn-primary mr-2">Scan QR Code</Link>
                    <button className="btn btn-primary disabled mr-2">My Profile</button>
                </div>
                <div className="card-body">
                    <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
                        <Tab eventKey="details" title="Personal Details">
                            <div className="form-group pt-4">
                                <label>First Name</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={fname}
                                    onChange={e => {setFname(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={lname}
                                    onChange={e => {setLname(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select 
                                    className={required}
                                    defaultValue={gender}
                                    onChange={e => {setGender(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                >
                                    <option selected value={gender}>{gender}</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Birth Date</label>
                                <input 
                                    type="date" 
                                    className={required}
                                    value={bday}
                                    onChange={e => {setBday(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact No</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={contact}
                                    onChange={e => {setContact(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <div className="input-group mb-3">
                                    <div class="custom-file">
                                        <input 
                                            type="file" 
                                            class="custom-file-input"
                                            accept="image/*"
                                            onChange={fileInput}
                                        />
                                        <label class="custom-file-label">{filename ? filename : 'Upload Image'}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input 
                                    type="text" 
                                    className={required}
                                    value={address}
                                    onChange={e => {setAddress(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="row pt-4">
                                <div className="d-flex justify-content-end col-md-12">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={updateDetails}
                                        disabled={loader}
                                    >
                                        {loader ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="login" title="Login Details">
                            <div className="form-group pt-4">
                                <label>E-Mail</label>
                                <input 
                                    type="email" 
                                    className={required}
                                    value={email}
                                    onChange={e => {setEmail(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input 
                                    type="password" 
                                    className={required}
                                    value={confirmPassword}
                                    onChange={e => {setConfirmPassword(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="row pt-4">
                                <div className="d-flex justify-content-end col-md-12">
                                    <button
                                        className="btn btn-primary"
                                        onClick={updateLogin}
                                        disabled={loader}
                                    >
                                        {loader ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="password" title="Change Password">
                            <div className="form-group pt-4">
                                <label>Current Password</label>
                                <input 
                                    type="password" 
                                    className={required}
                                    value={password}
                                    onChange={e => {setPassword(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input 
                                    type="password" 
                                    className={required}
                                    value={newPassword}
                                    onChange={e => {setNewPassword(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="form-group">
                                <label>Repeat New Password</label>
                                <input 
                                    type="password" 
                                    className={required}
                                    value={repeatpwd}
                                    onChange={e => {setRepeatpwd(e.target.value);setRequired('form-control')}}
                                    required
                                    disabled={ready}
                                />
                            </div>
                            <div className="row pt-4">
                                <div className="d-flex justify-content-end col-md-12">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={updatePassword}
                                        disabled={loader}
                                    >
                                        {loader ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
};

export default Profile;

