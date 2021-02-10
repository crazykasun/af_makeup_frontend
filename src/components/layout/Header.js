import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
// import {isAuthenticate, signOut} from "../rest/User";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: '#ffffff'}
    }
};

const Header = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/view')} to="/view">Booked Packages</Link>
                </li>

                {/*{!isAuthenticate() && (*/}
                {/*    <Fragment>*/}
                {/*        <li className="nav-item ml-auto">*/}
                {/*            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sign In</Link>*/}
                {/*        </li>*/}
                {/*        <li className="nav-item">*/}
                {/*            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign Up</Link>*/}
                {/*        </li>*/}
                {/*    </Fragment>*/}
                {/*)}*/}

                {/*{isAuthenticate() && (*/}
                {/*    <li className="nav-item ml-auto">*/}
                {/*    <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}}*/}
                {/*          onClick={() => signOut(() => {*/}
                {/*              history.push("/");*/}
                {/*          })*/}
                {/*          }>Sign Out</span>*/}
                {/*    </li>*/}
                {/*)}*/}
            </ul>
        </div>
    )
};

export default withRouter(Header);
