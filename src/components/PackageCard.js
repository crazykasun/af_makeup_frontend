import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import CardImage from "./CardImage";
import {isAuthenticate} from "../services/UserService";

const PackageCard = ({
                         pack
                     }) => {

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">{quantity} Available</span>
        ) : (
            <span className="badge badge-warning badge-pill">Not Available</span>
        );
    };

    const calculateDiscountedPrice = (product) => {
        let price = product.price;
        return parseFloat(price - ((price * product.discount) / 100)).toFixed(2);
    };

    return (
        <div className="col-auto mb-3">
            <Link to={`/package/${pack._id}`}>
                <CardImage item={pack} url="package"/>
            </Link>
            <h6 className="lead font-weight-bold text-center">{pack.name + ' (' + pack.duration + ' Nights)'}</h6>
            <h5 className="red-text font-weight-bolder text-center">Rs: {calculateDiscountedPrice(pack)}</h5>
            <div style={{textDecoration: 'line-through'}}
                className="text-black-50 font-weight-bolder text-center">{pack.discount > 0 ? 'Rs: ' + parseFloat(pack.price).toFixed(2) : ''}</div>

            <div className="text-center">
                {showStock(pack.quantity)}
            </div>
        </div>
    )
};

export default PackageCard;
