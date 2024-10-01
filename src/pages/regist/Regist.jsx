import React, { useState } from 'react';
import Headroom from 'react-headroom';
import { useDispatch } from 'react-redux';

import Header from '../../components/common/header/Header';
import AdminSideBar from '../../components/admin/sideBar/AdminSideBar';
import Footer from '../../components/common/footer/Footer';
import { regist } from '../../redux/action/authAction';

import './Regist.css';

const Login = () => {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(regist({ email, password, firstName, lastName }));
    };

    return (
        <div className='flex flex-col w-full h-auto items-center text-[#212529]'>
            <div
                onClick={() => setIsSideBarOpen(false)}
                className={`BodyCover flex flex-row ${isSideBarOpen ? '' : 'hidden'}`}>
            </div>
            <div className={`SideBar pt-5 flex flex-col ${isSideBarOpen ? '' : 'hidden'}`}>
                <AdminSideBar />
            </div>

            <Headroom className="Headroom w-full" disable={isSideBarOpen} >
                <Header setIsSideBarOpen={setIsSideBarOpen} />
            </Headroom>
            <div className="body-box flex flex-row w-full justify-center items-center">
                <div className="form-container flex flex-col p-4 mt-4 items-center w-[30%] mx-40">
                    <h2 className='form-title'>Login</h2>

                    <form onSubmit={handleLoginSubmit} className='form-card w-full m-4 flex flex-col '>
                        <label>First Name:</label>
                        <input type="text" value={firstName} onChange={handleFirstNameChange} />
                        <br />
                        <label>Last Name:</label>
                        <input type="text" value={lastName} onChange={handleLastNameChange} />
                        <br />
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                        <br />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                        <div className="flex flex-col items-end">
                            <a href="/auth/regist">Already have an account? Login here</a>
                        </div>
                        <br />
                        <button type="submit" >Regist</button>

                    </form>
                </div>
                <div className="image-container my-4">
                    <img src={require('../../images/code.png')} alt="Code" />
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default Login;