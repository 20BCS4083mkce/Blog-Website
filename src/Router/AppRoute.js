import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../components/Login';
import Home from '../components/Home';
import PrivateRoute from "./PrivateRoute";
import { validUser } from "../redux/features/authentication/validateSlice";
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import Register from "../components/Register";
const AppRoute = () => {

    const isvalid = useSelector((state) => state.validate.isValid);
    const dispatch = useDispatch();
    const isLoading=useSelector((state)=>state.validate.isLoading);
    const token = Cookies.get('token');
    useEffect(() => {


        if (token) {
            dispatch(validUser());

            console.log(isvalid)
        } else {
            console.log('error');
        }
    }, []);



    return token?(isLoading? (  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
    </div> ) :(
        <Router>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>)):(
        <Router>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    );
};

export default AppRoute;
