import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import CardImage from "./CardImage";
import {isAuthenticate} from "../services/UserService";

const BookedCard = ({
                         pack,
                        total
                     }) => {

    const calculateDiscountedPrice = (product) => {
        let price = product.price;
        return parseFloat(price - ((price * product.discount) / 100)).toFixed(2) * total;
    };

    return (
        <div className="col-auto mb-3">
            <Link to={`/package/${pack._id}`}>
                <CardImage item={pack} url="package"/>
            </Link>
            <h6 className="lead font-weight-bold text-center">{pack.name + ' (' + pack.duration + ' Nights)'}</h6>
            <h5 className="red-text font-weight-bolder text-center">Rs: {calculateDiscountedPrice(pack)}</h5>
            <h6 className="font-weight-bolder text-center">{total} Seat/s Booked</h6>
        </div>
    )
};

export default BookedCard;
