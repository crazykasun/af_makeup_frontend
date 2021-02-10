import React, {useState, useEffect} from "react";
import {getPackage, updateBookedAmount} from "../services/PackageService";
import PackageImage from "./PackageImage";
import {isAuthenticate, bookPackage, getUser} from "../services/UserService";
import swal from 'sweetalert';
import {Link, Redirect} from "react-router-dom";

const Package = props => {

    const [pack, setPack] = useState({});
    const [reg, setReg] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(1);

    //function to get product details
    const singleProduct = productId => {
        //get details from db
        getPackage(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setLoading(false);  //disable loader
                setPack(data);   //set products
            }
        })
    };

    useEffect(() => {
        const packId = props.match.params.packageId; //get product id from param
        singleProduct(packId);   //get product details
        getRegisteredPackages();
    }, [typeof pack._id !== 'undefined' ? pack._id : null]);

    const getRegisteredPackages = () => {
        const {token, user} = isAuthenticate();
        if (user) {
            getUser(user._id, token).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    checkRegistered(data.pack);
                }
            })
        }
    };

    const checkRegistered = (regPacks) => {
        regPacks.map((obj, i) => {
            console.log(pack._id === obj.pack._id, "check");
            if (pack._id === obj.pack._id) {
                console.log("Triggered")
                setReg(true);
            }
        })
    };

    const updatePackage = () => {
        updateBookedAmount(pack._id, pack.quantity - count).then(data => {
            setLoading(false);
            if (data.error) {
                console.log(data.error);
            } else {
                swal({
                    title: "Good job!",
                    text: "Successfully Registered!",
                    icon: "success",
                    button: "OK",
                }).then(() => {
                    setRedirect(true);
                });
            }
        });
    };

    const makeRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/booked"/>
        }
    };

    const showBookBtn = (quantity) => {
        const {token, user} = isAuthenticate();
        return !user ? (
            <button className="btn btn-yellow text-white mt-2 mb-2"
                    style={{width: 156}}><Link to={`/login`}> Sign In </Link>
            </button>
        ) : reg ? (
            <button className="btn bg-dark text-white mt-2 mb-2"
                    style={{width: 156}} disabled>Already Booked
            </button>
        ) : count > quantity ? (
            <button className="btn bg-dark text-white mt-2 mb-2"
                    style={{width: 156}} disabled>Book
            </button>
        ) : quantity > 0 ? (
            <div>
                <button onClick={clickSubmit} className="btn bg-dark text-white mt-2 mb-2"
                        style={{width: 156}} disabled={loading}>{loading ? 'Loading...' : 'Book'}
                </button>
                <h6 className="font-weight-bolder red-text ml-1">Only {quantity} seats available</h6>
            </div>
        ) : (
            <h5 className="font-weight-bolder red-text">All seats are booked</h5>
        )
    };

    const calculateDiscountedPrice = (product) => {
        let price = product.price;
        return parseFloat(price - ((price * product.discount) / 100)).toFixed(2);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const {token, user} = isAuthenticate();
        const getPack = {
            pack: {
                "pack": pack._id,
                "total": count
            }
        };

        bookPackage(user._id, token, getPack).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                updatePackage();
            }
        });
    };

    const showUpdateBtn = () => {
        return <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Qty</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleCountChange(pack._id)}/>
        </div>
    };

    const handleCountChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);  //set count
    };

    return <div className="container">
        {makeRedirect(redirect)}
        <div className="row">
            <div className="col-lg-8 col-sm-12 mt-5">
                <PackageImage item={pack} url="package"/>
            </div>
            <div className="col-lg-4 col-sm-12 mt-5">
                <h3 className="text-uppercase">{pack.name}</h3>

                <div className="row pl-3">
                    <h3 className="blue-text mt-3 mr-3 font-weight-bold">Rs: {calculateDiscountedPrice(pack) * count}</h3>
                    <h3 style={{textDecoration: 'line-through'}}
                        className="text-black-50 mt-3 mr-3 font-weight-bolder">{pack.discount > 0 ? 'Rs: ' + parseFloat(pack.price).toFixed(2) * count : ''}</h3>
                </div>

                <div className="mt-2">
                    <h5 className="font-weight-bolder">Duration: {pack.duration} Nights</h5>
                </div>

                <div className="mt-4">
                    <h5 className="font-weight-bolder">Package Description</h5>
                    <h5 className="text-black-50">{pack.description}</h5>
                </div>

                <div className="row mt-5">
                    <div className="col-sm-6">
                        {showUpdateBtn()}
                    </div>
                    <div className="col-sm-4">

                    </div>
                </div>

                <div className="row mt-3">
                    <div className="ml-2">
                        {showBookBtn(pack.quantity)}
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Package;
