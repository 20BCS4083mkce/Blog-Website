import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const isValid = useSelector((state) => state.validate.isValid);


    return isValid ? <Outlet /> : <Navigate to="/login" />;
}
