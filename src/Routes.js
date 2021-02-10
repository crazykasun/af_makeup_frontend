import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const Routes = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={SignUp}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    )
};

export default Routes;
