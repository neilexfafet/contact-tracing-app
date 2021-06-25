import React, { useState, useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormControl } from 'react-bootstrap';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, Comboboxlist, ComboboxOption } from '@reach/combobox';
import "@reach/combobox/styles.css";


function RegisterEstablishment() {

    toast.configure();
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [required, setRequired] = useState('form-control');
    const [name, setName] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [contact, setContact] = useState('');
    const [address1, setAddress1] = useState('');
    const [addressLat, setAddressLat] = useState('');
    const [addressLng, setAddressLng] = useState('');
    const [image, setImage] = useState(null);
    const [filename, setFilename] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatpwd, setRepeatpwd] = useState('');
    const [markers, setMarkers] = useState([]);
    const [infoWindow, setInfoWindow] = useState(null);
    const [center, setCenter] = useState({
        lat: 8.467744, 
        lng: 124.673369
    });

    const onMapClick = useCallback( async (e) => {
        setMarkers([]);
        setMarkers(current => [...current, {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        },]);
        setInfoWindow({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
        setCenter({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
        setAddressLat(e.latLng.lat());
        setAddressLng(e.latLng.lng());
    }, []);

    const onAutocomplete = useCallback(e => {
        setMarkers([]);
        setMarkers(current => [...current, {
            lat: e.lat,
            lng: e.lng
        },]);
        setInfoWindow({
            lat: e.lat,
            lng: e.lng
        });
        setCenter({
            lat: e.lat,
            lng: e.lng
        });
        setAddressLat(e.lat);
        setAddressLng(e.lng);
    });

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const { ready, 
        value, 
        suggestions: { status, data }, 
        setValue, 
        clearSuggestions 
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 8.467744, 
                lng: () => 124.673369
            },
            radius: 200 * 1000
        }
    })

    const fileInput = (e) => {
        setImage(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const registrationUser = async () => {
        setLoader(true);
        if(addressLat == null || addressLng == null) {
            toast.error('Please pin your address on the map', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoader(false)
        } 
        if(addressLat != null && addressLng != null) {
            const formdata = new FormData();
            formdata.append('name', name);
            formdata.append('fname', fname);
            formdata.append('lname', lname);
            formdata.append('contact', contact);
            formdata.append('address', address1);
            formdata.append('address_lat', addressLat);
            formdata.append('address_lng', addressLng);
            formdata.append('image', image);
            formdata.append('email', email);
            formdata.append('password', password);
            formdata.append('repeatpwd', repeatpwd);
            console.log(address1)
            try {
                await api.establishmentRegister(formdata).then(response => {
                    if(response.data.success) {
                        toast.success(response.data.success, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
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
                        setRequired('form-control is-invalid')
                        setPassword('');
                        setRepeatpwd('');
                    }
                })
            } catch {
                alert('Error in CATCH');
            } finally {
                setLoader(false);
            }
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
                        <p className="login-box-msg"><strong>Register as an Establishment</strong></p>
                        <form>
                        <div class="row">
                            <div class="col-md-6">
                                <p className="login-box-msg ">Company Details</p> 
                                <div class="input-group mb-3">
                                    <input 
                                        type="text"
                                        class={required} 
                                        placeholder="Company Name"
                                        value={name}
                                        onChange={e => {setName(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                        <span class="fas fa-building"></span>
                                        </div>
                                    </div>
                                </div>
                                <Combobox 
                                    onSelect={async (address) => {
                                        setAddress1(address);
                                        clearSuggestions();
                                        setValue(address, false);
                                        try {
                                            const results = await getGeocode({ address });
                                            const latlng = await getLatLng(results[0]);
                                            onAutocomplete(latlng);
                                        } catch {
                                            console.log('ERROR IN CATCH')
                                        }
                                    }}
                                >
                                    <div className="input-group mb-3">
                                        <ComboboxInput
                                            value={value}
                                            onChange={e => {
                                                setValue(e.target.value);
                                                setAddress1(e.target.value)
                                            }}    
                                            disabled={!ready}
                                            placeholder="Address"
                                            className="form-control"
                                        />
                                        <ComboboxPopover style={{zIndex: 1001}}>
                                            {status === "OK" && data.map(({id, description}) => (
                                                <ComboboxOption key={id} value={description}/>
                                            ))}
                                        </ComboboxPopover>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                            <span className="fas fa-map"></span>
                                            </div>
                                        </div>
                                    </div>
                                </Combobox>
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
                                    <div class="custom-file">
                                        <input 
                                            type="file" 
                                            class="custom-file-input"
                                            accept="image/*"
                                            onChange={fileInput}
                                        />
                                        <label class="custom-file-label">{filename ? filename : 'Company Image'}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div className="map-container py-2">
                                    <GoogleMap 
                                        mapContainerStyle={{
                                            width: "100%",
                                            height: "40vh",
                                        }} 
                                        zoom={11} 
                                        center={center}
                                        onClick={onMapClick}
                                        onLoad={onMapLoad}
                                    >
                                        {markers.map(marker => (
                                            <Marker
                                                position={{ lat: marker.lat, lng: marker.lng }}
                                            />
                                        ))}
                                        {infoWindow ? (<InfoWindow position={{
                                                lat: infoWindow.lat,
                                                lng: infoWindow.lng
                                            }}
                                            onCloseClick={e => setInfoWindow(null)}
                                            >
                                            <div>{address1}</div>
                                        </InfoWindow>) : null }
                                    </GoogleMap>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="login-box-msg">Owner/Representative Details</p>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className={required} 
                                        placeholder="First Name"
                                        value={fname}
                                        onChange={e => {setFname(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className={required} 
                                        placeholder="Last Name"
                                        value={lname}
                                        onChange={e => {setLname(e.target.value);setRequired('form-control')}}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
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
                                    disabled={loader}
                                >{loader ? 'Loading...' : 'Register'}</button>
                            </div>
                        </div>
                        </form>
                        <p class="text-center pt-2">
                            Already have an account? <Link to="/" class="text-center">Login Here</Link><br/>
                            <Link to="/register/user">Register as User</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterEstablishment;

