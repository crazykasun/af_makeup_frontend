import React, {useState} from 'react';
import {signUp} from "../services/UserService";

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, success, error} = values;

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

    const showSuccess = () => {
        return (
            <div className="alert alert-info mt-2" style={{display: success ? '' : 'none'}}>
                New User Added
            </div>
        )
    };

    const saveData = (e) => {
        e.preventDefault();
        setValues({...values, error: false});
        signUp({name, email, password})
            .then(data => {
                console.log(data);
                if (data.error) {
                    setValues({...values, error: data.error, success: false});
                } else {
                    setValues({...values, name: '', email: '', password: '', error: '', success: true});
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
                        <h1 className="h3 mb-3 font-weight-normal mb-5">Please sign up</h1>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input type="text" id="name" className="form-control" placeholder="Name"
                               required
                               onChange={handleChange('name')}
                               autoFocus/>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input type="email" id="email" className="form-control mt-3" placeholder="Email address"
                               required
                               onChange={handleChange('email')}/>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control mt-3" placeholder="Password"
                               required
                               onChange={handleChange('password')}/>

                        {showSuccess()}
                        {showError()}

                        <button className="btn btn-lg btn-primary btn-block mt-4" type="submit" onClick={saveData}>Sign
                            up
                        </button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">

                </div>
            </div>
        </div>
    )
}

export default Signup;
