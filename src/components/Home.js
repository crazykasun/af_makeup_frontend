import React from 'react';
import {Link} from "react-router-dom";
import { MDBInput } from "mdbreact";

import homeImg from '../assets/images/home.jpg';

const Home = () => {

    return (
        <div className="row">

            <img src={homeImg} className="d-block w-100"/>
            <MDBInput label="Material input" />
            <Link className="nav-link" to="/view">Home</Link>
        </div>
    )
}

export default Home;
