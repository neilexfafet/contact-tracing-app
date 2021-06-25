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
import { format } from 'url';

function Home() {
    const history = useHistory();
    const [userHistory, setUserHistory] = useState(null);
    const [estHistory, setEstHistory] = useState(null);
    const [role, setRole] = useState('');
    
    useEffect(() => {
        api.getAuth().then(response => {
            setRole(response.data.role);
            api.getUserHistory(response.data.id).then(res => {
                setUserHistory(res.data);
            }, []);
            api.getEstablishmentHistory(response.data.id).then(res => {
                setEstHistory(res.data);
            }, []);
            console.log(response.data.id)
        }); 
    }, []);

    const renderHistoryUser = () => {
        if(!userHistory) {
            return(
                <tr>
                    <td colSpan="3" align="center">Loading Table</td>
                </tr>
            );
        }
        if(userHistory.length === 0) {
            return(
                <tr>
                    <td colSpan="3" align="center">No history.</td>
                </tr>
            );
        }
        return userHistory.map((row) => (
            <tr>
                <td width="60%">{row.get_establishment.get_details.company_name}</td>
                <td width="20%">{moment(row.created_at).format('LL')}</td>
                <td width="20%">{moment(row.created_at).format('LT')}</td>
            </tr>
        ))
    }

    const renderHistoryEstablishment = () => {
        if(!estHistory) {
            return(
                <tr>
                    <td colSpan="3" align="center">Loading Table</td>
                </tr>
            );
        }
        if(estHistory.length === 0) {
            return(
                <tr>
                    <td colSpan="3" align="center">No history.</td>
                </tr>
            );
        }
        return estHistory.map((row) => (
            <tr>
                <td width="60%">{row.get_user.get_details.first_name} {row.get_user.get_details.last_name}</td>
                <td width="20%">{moment(row.created_at).format('LL')}</td>
                <td width="20%">{moment(row.created_at).format('LT')}</td>
            </tr>
        ))
    }

    if(!role) {
        return (
            <span></span>
        )
    }
    if(role == "user") {
        return (
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <button className="btn btn-primary disabled mr-2">History</button>
                        <Link to="/myqrcode" className="btn btn-primary mr-2">My QR Code</Link>
                        <Link to="/scanqrcode" className="btn btn-primary mr-2">Scan QR Code</Link>
                        <Link to="/profile" className="btn btn-primary mr-2">My Profile</Link>
                    </div>
                    <div className="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Transaction</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderHistoryUser()}
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
    if(role == "establishment") {
        return (
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <button className="btn btn-primary disabled mr-2">History</button>
                        <Link to="/announcement" className="btn btn-primary mr-2">Announcement</Link>
                        <Link to="/myqrcode" className="btn btn-primary mr-2">My QR Code</Link>
                        <Link to="/scanqrcode" className="btn btn-primary mr-2">Scan QR Code</Link>
                        <Link to="/profile" className="btn btn-primary mr-2">My Profile</Link>
                    </div>
                    <div className="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Transaction</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderHistoryEstablishment()}
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
};

export default Home;

