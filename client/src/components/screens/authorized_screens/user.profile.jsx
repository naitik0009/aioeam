import { useState, useEffect } from "react"
import { Navbar } from "./navbar.extend";
import { useNavigate } from "react-router-dom";
import * as React from 'react';

export const Profile = () => {
    const [error, setError] = useState([]);
    const [authorizedData, setAuthorizedData] = useState({
        id: "",
        username: "",
        email: "",
        role:"",
    });
    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem("authToken")) {
            navigate("/login");
        };
        async function getData() {
            const response = await fetch("http://127.0.0.1:8000/api/v1/profile", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem("authToken")}`,
                }
            });
            const result = await response.json().then((res) => {
                console.log(res.data.message);
                if (res.code !== "success") {
                    console.log("nahi huwa login vai")
                    localStorage.removeItem("authToken");
                } else if (res.code === "ErrorResponse") {
                    alert(res.mesage, "cannot login");
                }
                setAuthorizedData({
                    id: res.data._id,
                    username: res.data.username,
                    email: res.data.email,
                    role:res.data.role,
                });
            }).catch((error) => {
                localStorage.removeItem("authToken");
                setError(error);
            })
        };
        getData();
    }, [navigate]);



    return (
        <>
            <Navbar />

            <div align="center">
                <div className="card" style={{width: "18rem"}}>
                    <img src="https://www.blexar.com/avatar.png" className="card-img-top" alt={authorizedData.username}/>
                        <div className="card-body">
                            <span><h5>{authorizedData.username}</h5></span>
                            <h5 className="card-title">{authorizedData.email}</h5>
                            <span>role:<h5>{authorizedData.role}</h5></span>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            <a href="#" className="btn btn-primary">Edit Profile</a>
                        </div>
                </div>
            </div>

        </>
    )
}