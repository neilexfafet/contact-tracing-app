import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import RegisterEstablishment from './components/RegisterEstablishment';
import Profile from './components/Profile';
import SideProfile from './components/SideProfile';
import Announcement from './components/Announcement';
import Myqrcode from './components/Myqrcode';
import Scanqrcode from './components/Scanqrcode';

function App() {

    return (
        <Router className="App__container">
            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route exact path="/register/user">
                    <RegisterUser/>
                </Route>
                <Route exact path="/register/establishment">
                    <RegisterEstablishment/>
                </Route>
                <Route exact path="/home">
                    <Navbar/>
                    <div className="container pt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <SideProfile/>
                            </div>
                            <div className="col-md-8">
                            <Home/>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/profile">
                    <Navbar/>
                    <div className="container pt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <SideProfile/>
                            </div>
                            <div className="col-md-8">
                            <Profile/>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/announcement">
                    <Navbar/>
                    <div className="container pt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <SideProfile/>
                            </div>
                            <div className="col-md-8">
                            <Announcement/>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/myqrcode">
                    <Navbar/>
                    <div className="container pt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <SideProfile/>
                            </div>
                            <div className="col-md-8">
                            <Myqrcode/>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/scanqrcode">
                    <Navbar/>
                    <div className="container pt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <SideProfile/>
                            </div>
                            <div className="col-md-8">
                            <Scanqrcode/>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/add">
                    <Navbar/>
                    <Add/>
                </Route>
                <Route exact path="/edit">
                    <Navbar/>
                    <Edit/>
                </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));

