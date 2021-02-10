import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {isAuthenticate, signOut} from "../../services/UserService";
import '../../assets/styles.css';

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

                {isAuthenticate() && isAuthenticate().user.role === 1 && (
                    <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" style={{color: '#0388ff'}} id="navbarScrollingDropdown" role="button"
                                  data-toggle="dropdown" aria-expanded="false">
                                Admin
                            </span>
                        <ul className="dropdown-menu mt-2" aria-labelledby="navbarScrollingDropdown">
                            <li className="nav-item">
                                <Link className="nav-link bg-dark" style={isActive(history, '/admin/addpack')} to="/admin/addpack">Add Packages</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link bg-dark" style={isActive(history, '/admin/create')} to="/admin/create">Create Admin</Link>
                            </li>
                        </ul>
                    </li>
                )}

                {!isAuthenticate() && (
                    <Fragment>
                        <li className="nav-item ml-auto">
                            <Link className="nav-link" style={isActive(history, '/login')} to="/login">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign Up</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticate() && (
                    <li className="nav-item ml-auto">
                    <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}}
                          onClick={() => signOut(() => {
                              history.push("/");
                          })
                          }>Sign Out</span>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default withRouter(Header);
