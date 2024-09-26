import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';

const navHook = (Component) => {
    return (props) => {
        const navi = useNavigate();
        return < Component navigate={navi}{...props} />;
    }
}
export default navHook;