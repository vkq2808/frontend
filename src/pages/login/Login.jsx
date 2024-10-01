import React, { useState } from 'react';
import Headroom from 'react-headroom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/common/header/Header';
import AdminSideBar from '../../components/admin/sideBar/AdminSideBar';
import Footer from '../../components/common/footer/Footer';
import { login } from '../../redux/action/authAction';

import './Login.css';

const Login = () => {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };


    React.useEffect(() => {
        if (auth.token) navigate("/")
    }, [auth.token, navigate])


    return (
        <div className='flex flex-col w-full h-auto items-center text-[#212529]'>

            <div className="body-box flex flex-row w-full justify-between items-center px-20">
                <div className="form-container flex flex-col p-4 mt-4 items-center w-[30%]">
                    <h2 className='form-title'>Login</h2>

                    <form onSubmit={handleLoginSubmit} className='form-card w-full m-4 flex flex-col '>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                        <br />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                        <div className="flex flex-col items-end">
                            <a href="/auth/regist">Don't have an account? Register here</a>
                            <a href="/auth/forgot-password">Forgot password?</a>
                        </div>
                        <br />
                        <button type="submit" >Login</button>

                    </form>
                </div>
                <div className="image-container my-4">
                    <img src={require('../../images/code.png')} alt="Code" />
                </div>
            </div>
        </div >
    );
};

export default Login;