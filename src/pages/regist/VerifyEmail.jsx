import React, { useState } from 'react';
import Headroom from 'react-headroom';
import { useDispatch } from 'react-redux';


import Header from '../../components/common/header/Header';
import AdminSideBar from '../../components/admin/sideBar/AdminSideBar';
import Footer from '../../components/common/footer/Footer';
import { verifyEmail } from '../../redux/action/authAction';
import Loading from '../../components/common/alert/Loading';


const VerifyEmail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [result, setResult] = useState('');

    const dispatch = useDispatch();

    const path = window.location.pathname;
    const token = path.split('/').reverse()[0];

    React.useEffect(() => {
        dispatch(verifyEmail({ token, setIsLoading, setResult }));
    }, []);

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
            <div className="body-box flex flex-row w-full justify-between items-center px-20">
                <div className="w-1/2 h-auto">
                    <div className="flex flex-col items-start">
                        {isLoading && <Loading />}
                        {!isLoading &&
                            result === 'Email verified successfully' ?
                            (<h1 className="text-4xl text-center">Email verified successfully</h1>)
                            : result === 'Email already verified' ?
                                (<h1 className="text-4xl text-center">Email already verified</h1>)
                                : result === 'Token is invalid or expired' ?
                                    (<h1 className="text-4xl text-center">Token is invalid or expired</h1>)
                                    : (<h1 className="text-4xl text-center">{result}</h1>)
                        }
                        {!isLoading &&
                            <a href="/auth/login" className="text-2xl text-blue-500">Go to login page</a>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default VerifyEmail;