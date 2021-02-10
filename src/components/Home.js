import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { MDBInput } from "mdbreact";
import {getPackages} from "../services/PackageService";
import PackageCard from "./PackageCard";

import homeImg from '../assets/images/home.jpg';

const Home = () => {

    const [packs, setPacks] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showView, setShowView] = useState(false);

    const loadProducts = () => {
        getPackages('quantity').then(data => {
            setLoading(false);
            if (data.error) {
                setError(data.error);
            } else {
                setPacks(data);
                setShowView(true);
            }
        })
    };

    useEffect(() => {
        setLoading(true);
        loadProducts();
    }, []);

    return (
        <div className="row">
            <img src={homeImg} className="d-block w-100"/>
            <div className="mt-5 d-block w-100">
                <div className="shopping-grid">
                    <div className="container-fluid">
                        <h3 className="font-weight-bold mb-4" align="center">LATEST PACKAGES</h3>
                        <div className="row">
                            {packs.map((pack, i) => (
                                <div key={i} className="col-md-6 col-lg-4 col-xs-4 col-sm-6 mb-3">
                                    <PackageCard pack={pack}/>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
