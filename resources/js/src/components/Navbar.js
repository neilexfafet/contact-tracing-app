import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    toast.configure();
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [logoutModal, setLogoutModal] = useState(false);

    if(!localStorage.getItem('userAuth')) {
        history.push('/');
        toast.error('Unauthorized! Please sign in to have full access.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const logoutModalOpen = () => setLogoutModal(true);
    const logoutModalClose = () => setLogoutModal(false);

    useEffect(() => {
        api.getAuth().then(response => {
            setId(response.data.id)
            api.getAuthDetails(response.data.id).then(res => {
                setName(res.data.first_name+' '+res.data.last_name)
            });
        });
    }, []);


    const logoutUser = async () => {
        setLoading(true)
        try {
            await api.logout().then(response => {
                localStorage.clear();
                history.push('/');
                toast.info(response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        } catch {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-5">
            <Link className="navbar-brand" to="/home">Contact-Tracing App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <div className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {name ? name : 'Loading...'}&nbsp;&nbsp;
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {/* <a className="dropdown-item" href="#">Profile</a> */}
                                <button className="dropdown-item" onClick={logoutModalOpen}>Logout</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <Modal size="md" show={logoutModal} onHide={logoutModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Logout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to logout?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={logoutModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" disabled={loading} onClick={logoutUser}>
                            {loading ? 'Loading...' : 'Confirm'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </nav>
    );
};

export default Navbar;