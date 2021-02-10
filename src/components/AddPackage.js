import React, {useEffect, useState, Fragment} from "react";
import {isAuthenticate} from "../services/UserService";
import "mdbreact/dist/css/mdb.css";
import {createPackage} from "../services/AdminService";
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody} from 'mdbreact';
import {confirmAlert} from "react-confirm-alert";

const AddPackage = () => {
    const {user, token} = isAuthenticate();
    const [loader, setLoader] = useState(false);
    const [packageValues, setPackageValues] = useState({
        name: '',
        description: '',
        price: '0.00',
        quantity: '0',
        image: '',
        duration: 0,
        discount: '0.00',
        error: false,
        createdPackage: false,
        showSuccess: false,
        redirectToProfile: '',
        formData: ''
    });

    const {
        name,
        description,
        price,
        quantity,
        duration,
        discount,
        error,
        createdPackage,
        showSuccess,
        redirectToProfile,
        formData
    } = packageValues;

    useEffect(() => {
        setPackageValues({...packageValues, formData: new FormData()})
    }, []);

    const handleOnChange = (name) => (event) => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setPackageValues({...packageValues, [name]: value});
    };

    const submit = (event) => {
        event.preventDefault();
        setLoader(true);
        setPackageValues({...packageValues, error: '', loading: true});

        if (packageValues.image) {
            createPackage(user._id, token, formData)
                .then(data => {
                    if (data.error) {
                        setPackageValues({...packageValues, error: data.error, showSuccess: false});
                        setLoader(false);
                    } else {
                        setLoader(false);
                        setPackageValues({
                            ...packageValues,
                            name: '',
                            description: '',
                            image: '',
                            price: '',
                            quantity: '',
                            duration: '',
                            discount: '',
                            error: false,
                            showSuccess: true,
                            createProduct: data.name,
                            formData: new FormData()
                        });
                        confirmAlert({
                            title: 'New package is created successfully!',
                            buttons: [
                                {
                                    label: 'OK',
                                }
                            ]
                        });
                    }
                });
        } else {
            confirmAlert({
                title: 'Please upload an image!',
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
            setLoader(false);
        }

    };

    const showErrorMsg = () => {
        if (error) {
            confirmAlert({
                title: error,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }
    };

    const newPostForm = () => (
        <div className="mb-5">
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="12" lg="12" sm="12">
                        {showErrorMsg()}
                        <MDBCard>
                            <MDBCardBody>
                                <form onSubmit={submit}>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupFileAddon01">
                                          Post Image
                                        </span>
                                        </div>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                onChange={handleOnChange('image')}
                                                className="custom-file-input"
                                                name="image"
                                                accept="image/*"
                                            />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                Browse an image
                                            </label>
                                        </div>
                                    </div>
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Package Name
                                    </label>
                                    <input
                                        type="text"
                                        onChange={handleOnChange('name')}
                                        className="form-control"
                                        value={name}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Package Description
                                    </label>
                                    <textarea
                                        type="text"
                                        onChange={handleOnChange('description')}
                                        className="form-control"
                                        value={description}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        onChange={handleOnChange('price')}
                                        className="form-control"
                                        value={price}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Discount
                                    </label>
                                    <input
                                        type="number"
                                        onChange={handleOnChange('discount')}
                                        className="form-control"
                                        value={discount}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        onChange={handleOnChange('quantity')}
                                        className="form-control"
                                        value={quantity}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Duration
                                    </label>
                                    <input
                                        type="number"
                                        onChange={handleOnChange('duration')}
                                        className="form-control"
                                        value={duration}
                                    />

                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn className="btn btn-blue" type="submit"
                                                disabled={loader}>{loader ? 'Loading...' : 'Add Product'}
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    );

    return (
        <div>
            {newPostForm()}
        </div>
    );
};

export default AddPackage;
