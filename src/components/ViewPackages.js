import React, {useState, useEffect} from "react";
import {getPackages} from "../services/PackageService";
import PackageCard from "./PackageCard";

const ViewPackages = () => {

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

    const appendView = () => {
        return (
            <div className="mt-4">
                <div className="shopping-grid">
                    <div className="container">
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
        );
    };

    return (
        <div>
            {appendView()}
        </div>
    );
};

export default ViewPackages;
