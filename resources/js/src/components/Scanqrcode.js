import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
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
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';

function Scanqrcode() {
    const history = useHistory();
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const [scanResult, setScanResult] = useState('');
    const qrRef = useRef(null);

    useEffect(() => {
        api.getAuth().then(response => {
            setId(response.data.id);
            setRole(response.data.role);
        });
    }, []);

    const handleErrorEstablishment = (error) => {
        console.log(error)
    }
    const handleScanEstablishment = (result) => {
        if(result) {
            console.log(result);
            console.log(id)
            api.addTraceUser({result, id}).then(res => {
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
                }
            })
        }
    }

    const handleErrorUser = (error) => {
        console.log(error)
    }
    const handleScanUser = (result) => {
        if(result) {
            console.log(result);
            console.log(id)
            api.addTraceUser({result, id}).then(res => {
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
                }
            })
        }
    }

    if(!role) {
        return (
            <span></span>
        )
    }
    if(role == 'establishment') {
        return (
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <Link to="/home" className="btn btn-primary mr-2">History</Link>
                        <Link to="/announcement" className="btn btn-primary mr-2">Announcement</Link>
                        <Link to="/myqrcode" className="btn btn-primary mr-2">My QR Code</Link>
                        <button className="btn btn-primary disabled mr-2">Scan QR Code</button>
                        <Link to="/profile" className="btn btn-primary mr-2">My Profile</Link>
                    </div>
                    <div className="card-body">
                        <QrReader
                            delay={300}
                            style={{width: '100%'}}
                            onError={handleErrorEstablishment}
                            onScan={handleScanEstablishment}
                        />
                        <br/>
                        <br/>
                        <br/>
                        {scanResult}
                    </div>
                </div>
        );
    }
    if(role == 'user') {
        return (
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <Link to="/home" className="btn btn-primary mr-2">History</Link>
                        <Link to="/myqrcode" className="btn btn-primary mr-2">My QR Code</Link>
                        <button className="btn btn-primary disabled mr-2">Scan QR Code</button>
                        <Link to="/profile" className="btn btn-primary mr-2">My Profile</Link>
                    </div>
                    <div className="card-body">
                        <QrReader
                            delay={300}
                            style={{width: '100%'}}
                            onError={handleErrorUser}
                            onScan={handleScanUser}
                        />
                        <br/>
                        <br/>
                        <br/>
                        {scanResult}
                    </div>
                </div>
        );
    }
};

export default Scanqrcode;

