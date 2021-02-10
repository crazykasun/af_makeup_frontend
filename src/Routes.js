import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AdminRoute from "./auth/AdminRoute";
import AddAdmin from "./components/AddAdmin";
import AddPackage from "./components/AddPackage";
import ViewPackages from "./components/ViewPackages";
import Package from "./components/Package";
import BookedPackages from "./components/BookedPackages";

const Routes = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/view" exact component={ViewPackages}/>
                <Route path="/booked" exact component={BookedPackages}/>
                <Route path="/package/:packageId" exact component={Package} />
                <AdminRoute path="/admin/create" exact component={AddAdmin} />
                <AdminRoute path="/create/product" exact component={AddPackage} />
            </Switch>
            {/*<Footer/>*/}
        </BrowserRouter>
    )
};

export default Routes;
