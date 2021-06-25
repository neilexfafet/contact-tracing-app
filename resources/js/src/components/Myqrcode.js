import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
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

function Myqrcode() {
    const history = useHistory();
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [scanResult, setScanResult] = useState('');
    const qrRef = useRef(null);

    useEffect(() => {
        api.getAuth().then(response => {
            setId(response.data.id)
            setRole(response.data.role)
        });
    }, []);

    if(id) {
        const generate = async () => {
            try {
                const response = await QRCode.toDataURL(id.toString());
                setImage(response);
            } catch(error) {
                console.log(error)
            }
        }
        {generate()}
    }

    if(!role) {
        return(
            <span></span>
        )
    }
    if(role == 'user') {
        return (
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <Link to="/home" className="btn btn-primary mr-2">History</Link>
                        <button className="btn btn-primary disabled mr-2">My QR Code</button>
                        <Link to="/scanqrcode" className="btn btn-primary mr-2">Scan QR Code</Link>
                        <Link to="/profile" className="btn btn-primary mr-2">My Profile</Link>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-column text-center col-md-12">
                            <h3>My QR Code</h3>
                            <img src={image} className="img-fluid"></img>
                        </div>
                    </div>
                </div>
        );
    }
    if(role == 'establishment') {
        return (
            <div className="card card-outline card-primary">
                <div className="card-header">
                    <Link to="/home" className="btn btn-primary mr-2">History</Link>
                    <Link to="/announcement" className="btn btn-primary mr-2">Announcement</Link>
                    <button className="btn btn-primary disabled mr-2">My QR Code</button>
                    <Link to="/scanqrcode" className="btn btn-primary mr-2">Scan QR Code</Link>
                    <Link to="/profile" className="btn btn-primary mr-2">My Profile</Link>
                </div>
                <div className="card-body">
                    <div className="d-flex flex-column text-center col-md-12">
                        <h3>My QR Code</h3>
                        <img src={image} className="img-fluid"></img>
                    </div>
                </div>
            </div>
        );
    }
};

export default Myqrcode;

