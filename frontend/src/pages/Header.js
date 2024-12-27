import React, { } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header(props) {

    const navigate = useNavigate();

    function logMeOut() {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/logout",
        })
            .then((response) => {
                props.token()
                localStorage.removeItem('email')
                navigate("/");
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    const logged = localStorage.getItem('email');

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Cairocoders</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    {!logged ?
                        <button className="btn btn-outline-success" type="submit">Login</button>
                        : <button className="btn btn-outline-danger" type="submit" onClick={logMeOut}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Header;