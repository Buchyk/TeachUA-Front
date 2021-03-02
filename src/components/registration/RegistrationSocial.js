import React from 'react';
import {ROOT_URI} from "../../config/ApplicationConfig";


const RegistrationSocial = () => {

    return (
        <div className="icons">
            <div className="items">
                <a target="_blank" href="#"> <img src={`${ROOT_URI}/static/images/user/google.png`} className="logo" alt="Logo"/>
                </a>
                <a target="_blank" href="#"> <img src={`${ROOT_URI}/static/images/user/facebook.png`} className="logo" alt="Logo"/>
                </a>
            </div>
        </div>
    )
}

export default RegistrationSocial
