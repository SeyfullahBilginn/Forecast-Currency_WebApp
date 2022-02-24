import React from "react";
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Home from '../pages/Home';
import Layout from '../pages/Layout';
import AdminPage from './../pages/admin/AdminPage';
import User from '../pages/user/User';
import Login from './../pages/user/Login';
import Signup from './../pages/user/Signup';

export default function Routing(props) {
    
    return (

        (!props.isAdmin) ? (

            <Router>
                <Routes>
                    <Route path="/" exact element={<PrivateRoute><Layout isAdmin={props.isAdmin}><Home /></Layout></PrivateRoute>} />
                    <Route path="/user" element={<PrivateRoute><Layout isAdmin={props.isAdmin}><User /></Layout></PrivateRoute>} />
                    <Route path="/:cCode" element={<PrivateRoute><Layout isAdmin={props.isAdmin}><Home /></Layout></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router >

        )
            :
            (
                <Router>

                    {/* <div> */}
                    <Routes>
                        <Route path="/" element={<PrivateRoute><Layout isAdmin={props.isAdmin}><Home /></Layout></PrivateRoute>} />
                        <Route path="/user" element={<PrivateRoute><Layout isAdmin={props.isAdmin}><User /></Layout></PrivateRoute>} />
                        <Route path="/:cCode" element={<PrivateRoute><Layout isAdmin={props.isAdmin}><Home /></Layout></PrivateRoute>} />
                        <Route path="/admin" exact element={<PrivateRoute><Layout isAdmin={props.isAdmin}><AdminPage /></Layout></PrivateRoute>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                    {/* </div> */}
                </Router >
            )
    )
}