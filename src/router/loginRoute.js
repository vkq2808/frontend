import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Regist from '../pages/regist/Regist';
import VerifyEmail from '../pages/regist/VerifyEmail';

const LoginRoute = () => (
    <Routes>=
        <Route path='login' element={<Login />} />
        <Route path='regist' element={<Regist />} />
        <Route path='verify-email/*' element={<VerifyEmail />} />
    </Routes>
);

export default LoginRoute;
