const axios = window.axios;
const BASE_API_URL = 'http://127.0.0.1:8000/api';
const GOOGLE_MAP_API_KEY = 'AIzaSyB4TkU5ck4_xPPeson3smJBt0f4DliktdI';
const GOOGLE_MAP_API_KEY_TEST = 'YOUR_API_KEY';

export default {
    google_api_key: () => `${GOOGLE_MAP_API_KEY}`,
    userRegister: (user) => 
    axios.post(`${BASE_API_URL}/register/user`, user, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    establishmentRegister: (user) => 
    axios.post(`${BASE_API_URL}/register/establishment`, user, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    login: (user) =>
    axios.post(`${BASE_API_URL}/login`, user),
    getAuth: () =>
    axios.get(`${BASE_API_URL}/user`, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    getAuthDetails: (id) =>
    axios.get(`${BASE_API_URL}/user/${id}/details`, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    logout: (user) =>
    axios.post(`${BASE_API_URL}/logout`, user, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    getAllUsers: () =>
    axios.get(`${BASE_API_URL}/users`),
    getUserHistory: (id) => 
    axios.get(`${BASE_API_URL}/user/${id}/user-history`, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    getEstablishmentHistory: (id) => 
    axios.get(`${BASE_API_URL}/user/${id}/establishment-history`, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    updateDetailsUser: (user) =>
    axios.post(`${BASE_API_URL}/user/update-details/user`, user, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    updateDetailsEstablishment: (user) =>
    axios.post(`${BASE_API_URL}/user/update-details/establishment`, user, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    updateLoginUser: (user) =>
    axios.post(`${BASE_API_URL}/user/update-login/user`, user, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    updatePasswordUser: (user) =>
    axios.post(`${BASE_API_URL}/user/update-password/user`, user, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    postAnnouncement: (user) =>
    axios.post(`${BASE_API_URL}/user/post-announcement`, user, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    getAllPosts: (id) =>
    axios.get(`${BASE_API_URL}/user/${id}/all-posts`, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    updatePost: (user) =>
    axios.post(`${BASE_API_URL}/user/update-post`, user, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    deletePost: (user) =>
    axios.post(`${BASE_API_URL}/user/delete-post`, user, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    addTraceUser: (user) =>
    axios.post(`${BASE_API_URL}/user/trace/user`, user, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
    addTraceEstablishment: (user) =>
    axios.post(`${BASE_API_URL}/user/establishment`, user, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userAuth')
        }
    }),
}