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
import { toast } from 'react-toastify';

function Announcement() {
    const history = useHistory();
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [postModal, setPostModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [post, setPost] = useState('');
    const [postList, setPostList] = useState('');
    const [postId, setPostId] = useState('');

    useEffect(() => {
        api.getAuth().then(response => {
            setId(response.data.id);
            api.getAllPosts(response.data.id).then(res => {
                setPostList(res.data);
            }, []);
        });
    }, []);

    const postModalOpen = () => setPostModal(true);
    const postModalClose = () => setPostModal(false);
    const editModalOpen = () => setEditModal(true);
    const editModalClose = () => setEditModal(false);
    const deleteModalOpen = () => setDeleteModal(true);
    const deleteModalClose = () => setDeleteModal(false);

    const postAnnounce = async () => {
        setLoading(true);
        try {
            await api.postAnnouncement({id, post}).then(res => {
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
                    postModalClose();
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
        } catch {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const editAnnounce = async () => {
        setLoading(true);
        try {
            await api.updatePost({postId, post}).then(res => {
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
                    editModalClose();
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
        } catch {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteAnnounce = async () => {
        setLoading(true);
        try {
            await api.deletePost({postId}).then(res => {
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
                    deleteModalClose();
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
        } catch {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const renderPosts = () => {
        if(!postList) {
            return (
                <div className="row py-5">
                    <div class="d-flex justify-content-center col-md-12">
                        <h4>Loading posts....</h4>
                    </div>
                </div>
            )
        }
        if(postList.length === 0) {
            return (
                <div className="row py-5">
                    <div class="d-flex justify-content-center col-md-12">
                        <h4>No posts have been submitted....</h4>
                    </div>
                </div>
            )
        }
        return postList.map((row) => (
            <div className="post">
                <div className="user-block">
                    <img className="img-circle img-bordered-sm" src={row.get_establishment.get_details.image != null ? '/img/'+row.get_establishment.get_details.image : 'img/user.jpg'} alt="user image"/>
                    <span className="username">
                        {row.get_establishment.get_details.company_name}
                        <a href="#" onClick={e => {
                            setPostId(row.id);
                            deleteModalOpen();
                        }} class="float-right btn-tool"><i class="fas fa-times"></i></a>
                        <a href="#" onClick={e => {
                            setPostId(row.id);
                            setPost(row.announcement);
                            editModalOpen()}} class="float-right btn-tool"><i class="fas fa-edit"></i></a>
                    </span>
                    <span className="description">{moment(row.created_at).format('LLL')}</span>
                </div>
                <p>{row.announcement}</p>
            </div>
        ));
    }
    
    return (
        <div className="card card-outline card-primary">
            <div className="card-header">
                <Link to="/home" className="btn btn-primary mr-2">History</Link>
                <button className="btn btn-primary disabled mr-2">Announcement</button>
                <Link to="/myqrcode" className="btn btn-primary mr-2">My QR Code</Link>
                <Link to="/scanqrcode" className="btn btn-primary mr-2">Scan QR Code</Link>
                <Link to="/profile" className="btn btn-primary mr-2">My Profile</Link>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="d-flex justify-content-end col-md-12">
                        <button onClick={e => {postModalOpen;setPost('')}} className="btn btn-success btn-sm"><i className="fa fa-plus"></i> Post Announcement</button>
                    </div>
                </div>
                {renderPosts()}
            </div>
            <Modal size="lg" show={postModal} onHide={postModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Context</label>
                        <textarea 
                            className="form-control" 
                            placeholder="Write announcement..." 
                            rows="5"
                            onChange={e => setPost(e.target.value)}
                        ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={postModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={loading} onClick={postAnnounce}>
                        {loading ? 'Loading...' : 'Post Announcement'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={editModal} onHide={editModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Context</label>
                        <textarea 
                            className="form-control" 
                            placeholder="Write announcement..." 
                            rows="5"
                            value={post}
                            onChange={e => setPost(e.target.value)}
                        ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={editModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={loading} onClick={editAnnounce}>
                        {loading ? 'Loading...' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={deleteModal} onHide={deleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteModalClose}>
                        Close
                    </Button>
                    <Button variant="danger" disabled={loading} onClick={deleteAnnounce}>
                        {loading ? 'Loading...' : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Announcement;

