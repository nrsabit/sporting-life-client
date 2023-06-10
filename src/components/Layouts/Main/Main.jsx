import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet className='max-w-7xl mx-auto'></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;