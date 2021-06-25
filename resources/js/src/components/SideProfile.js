import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import moment from "moment";

function SideProfile() {
    const history = useHistory();
    const [role, setRole] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [gender, setGender] = useState('');
    const [bday, setBday] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('img/user.jpg');

    useEffect(() => {
        api.getAuth().then(response => {
            setEmail(response.data.email);
            setRole(response.data.role);
            api.getAuthDetails(response.data.id).then(res => {
                setCompanyName(res.data.company_name)
                setFname(res.data.first_name);
                setLname(res.data.last_name);
                setContact(res.data.contact_no);
                setGender(res.data.gender);
                setBday(res.data.birth_date);
                setAddress(res.data.address);
                if(res.data.image != null) {
                    setImage('img/'+res.data.image)
                }
            });
        });
    }, []);


    const name = () => {
        if(!fname && !lname) {
            return(
                'Loading...'
            );
        } else {
            return(
                <span>{fname} {lname}</span>
            );
        }
    }

    const cName = () => {
        if(!companyName) {
            return(
                'Loading...'
            );
        } else {
            return(
                <span>{companyName}</span>
            );
        }
    }


    if(!role) {
        return (
            <span></span>
        )
    }
    if(role == "user") {
        return (
            <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                    <div className="text-center">
                    <img className="img-fluid img-circle col-md-6"
                        src={image}
                        alt="User profile picture"/>
                    </div>
                    <h3 className="profile-username text-center">{name()}</h3>
                    <p className="text-muted text-center">{email ? email : 'Loading...'}</p>
                    <hr/>
                    <div className="px-4">
                        <div className="row justify-content-between pb-2">
                            <strong>
                                <i className="fas fa-phone"></i> Phone
                            </strong>
                            <p className="text-muted">
                                {contact}
                            </p>
                        </div>
                        <div className="row justify-content-between pb-2">
                            <strong>
                                <i className="fas fa-user"></i> Gender
                            </strong>
                            <p className="text-muted">
                                {gender}
                            </p>
                        </div>
                        <div className="row justify-content-between pb-2">
                            <strong>
                                <i className="fas fa-calendar"></i> Birth Date
                            </strong>
                            <p className="text-muted">
                                {moment(bday).format('ll')}
                            </p>
                        </div>
                        <div className="row justify-content-between pb-2">
                            <strong>
                                <i className="fas fa-map-marker-alt"></i> Address
                            </strong>
                            <p className="text-muted">
                                {address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if(role == "establishment") {
        return (
            <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                    <div className="text-center">
                    <img className="img-fluid img-circle col-md-6"
                        src={image}
                        alt="User profile picture"/>
                    </div>
                    <h3 className="profile-username text-center">{cName()}</h3>
                    <p className="text-muted text-center">{email ? email : 'Loading...'}</p>
                    <hr/>
                    <div className="px-4">
                        <div className="row justify-content-between pb-2">
                            <strong>
                                <i className="fas fa-user"></i> Owner
                            </strong>
                            <p className="text-muted">
                                {fname} {lname}
                            </p>
                        </div>
                        <div className="row justify-content-between pb-2">
                            <strong>
                                <i className="fas fa-phone"></i> Phone
                            </strong>
                            <p className="text-muted">
                                {contact}
                            </p>
                        </div>
                        <div className="row justify-content-between pb-2">
                            <strong>
                                <i className="fas fa-map-marker-alt"></i> Address
                            </strong>
                            <p className="text-muted">
                                {address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default SideProfile;

