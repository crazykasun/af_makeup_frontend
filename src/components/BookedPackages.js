import React, {useState, useEffect} from "react";
import {getUser, isAuthenticate} from "../services/UserService";
import BookedCard from "./BookedCard";

const BookedPackages = () => {

    const [packs, setPacks] = useState([]);

    useEffect(() => {
        getRegisteredPackages();
    }, []);

    const getRegisteredPackages = () => {
        const {token, user} = isAuthenticate();
        if (user) {
            getUser(user._id, token).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setPacks(data.pack);
                }
            })
        }
    };

    const checkPackages = () => {
        if (packs.length === 0) {
            return (
                <div className="col-md-4 offset-md-4 mt-5 text-center">
                    <h1 className="mt-5">No any booked packages</h1>
                </div>
            )
        }
    };

    return (
        <div className="mt-4">
            <div className="shopping-grid">
                <div className="container-fluid">
                    <h3 className="font-weight-bold mb-4" align="center">BOOKED PACKAGES</h3>
                    <div className="row">
                        {checkPackages()}
                        {packs.map((pack, i) => (
                            <div key={i} className="col-md-12 col-lg-4 col-xs-4 col-sm-12 mb-3">
                                <BookedCard pack={pack.pack} total={pack.total}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookedPackages;
