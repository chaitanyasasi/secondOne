import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './home';
import FilterPage from "./Filter";
import DetailsPage from './Details'
import Header from './Headers';
import { useEffect, useState } from 'react';

const RouterPage = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:3103/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/JSON",
                    "Content-Type": "application/JSON",
                    "Access-Control-Allow-Credentials": true
                }
            })
            .then((response) => {
                if(response.status === 200) return response.json();
                throw new Error ("Authentication Failed");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            })
        };
        getUser();
    }, []);

    return (
        <BrowserRouter>
          <Header user = {user} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/filters" element={<FilterPage />} />
                <Route path="/details" element={<DetailsPage />} />

                <Route path="/success" element={<HomePage payStatus="success" />} />
                <Route path="/cancel" element={<HomePage payStatus="fail" />} />
            </Routes>
        </BrowserRouter>
    )
}
export default RouterPage;