import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileLandingPage from '../pages/profile/profileLandingPage';

const HomeRoute = () => (
    <Routes>=
        <Route path='profile/*' element={<ProfileLandingPage />} />
    </Routes>
);

export default HomeRoute;
