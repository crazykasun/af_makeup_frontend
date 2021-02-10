import React, {useState, useEffect} from "react";
import {getUser, isAuthenticate} from "../services/UserService";
import PackageCard from "./PackageCard";

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
                    console.log("registered Packages!");
                    console.log(data.pack);
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
        <div>
            <div className="row">
                {checkPackages()}
                {packs.map((pack, i) => (
                    <div key={i} className="col-md-6 col-lg-3 col-xs-3 col-sm-6 mb-3">
                        <PackageCard pack={pack.pack}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default BookedPackages;
