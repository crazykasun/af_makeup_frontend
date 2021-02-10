import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {authenticate, logIn} from "../services/UserService";

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirect: false
    });

    const {email, password, error, redirect} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const showError = () => {
        return (
            <div className="alert alert-danger mt-2" style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        )
    };

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to="/"/>
        }
    };

    const sendData = (e) => {
        e.preventDefault();
        setValues({...values, error: false});
        logIn({email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    authenticate(data, () => {
                        setValues({...values, redirect: true});
                    });
                }
            })
    };

    return (
        <div className="text-center container mt-5">
            <div className="row">
                <div className="col-md-4 col-sm-12 col-lg-4">

                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">
                    <div className="form-signin mt-5">
                        {/*<img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">*/}
                        <h1 className="h3 mb-3 font-weight-normal mb-5">Please sign in</h1>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input type="email" id="email" className="form-control" placeholder="Email address"
                               required
                               onChange={handleChange('email')}
                               autoFocus/>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control mt-3" placeholder="Password"
                               required
                               onChange={handleChange('password')}/>

                        {showError()}

                        <button className="btn btn-lg btn-primary btn-block mt-4" type="submit" onClick={sendData}>Sign
                            in
                        </button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">

                </div>
            </div>
            {redirectUser()}
        </div>
    )
}

export default Login;
