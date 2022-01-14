import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {Google_Id,Facebook_Id} from "../BaseUrl";
import './FormStyle.css';
export default function SocialLogin() {
    const responseGoogle = (response) => {
        console.log(response);
    }
    const responseFacebook = (response) => {
        console.log(response);
    }
return(
    <>
        <div className="social-container my-3 my-lg-2">
            <GoogleLogin
                render={renderProps => (
                    <a onClick={renderProps.onClick} className="social"><i className="fab fa-google-plus-g"></i></a>
                )}
                clientId={Google_Id}
                buttonText=""
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId={Facebook_Id}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <a onClick={renderProps.onClick} className="social"><i className="fab fa-facebook-f"></i></a>
                )}
            />
        </div>
        </>
)
}