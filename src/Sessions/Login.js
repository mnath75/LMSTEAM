import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {Link , useHistory} from 'react-router-dom'
import OtpInput from 'react-otp-input';
import SocialLogin from "./SocialLogin";
import './FormStyle.css';

export default function Login() {
    const [login, setLogin] = useState('login');
    const [otpView, setOtpVIew] = useState({
        otpscreen: false,
        value: ''
    })
    const [otp, setOtp] = useState();
    const history = useHistory();
    function UserLogin() {
        setLogin('false');
        setOtpVIew({
            otpscreen: true,
            value: 1
        });
    }

    function ForgetPassword() {
        setLogin('false');
        setOtpVIew({
            otpscreen: true,
            value: 2
        });
    }

    return (
        <>
            <div className="sign-in d-flex justify-content-center">
                {login === 'login' ? <div className={'form'}>
                    <h1 className={'h3'}>Sign in</h1>
                    <SocialLogin/>
                    <p>or use your account</p>
                    <input name="email" placeholder="Username/Mobile" required=""/>
                    <input type="password" name="pswd" placeholder="Password" required=""/>
                    <Link to={'/'} onClick={() => {
                        setLogin('forget')
                    }}>Forget your Password?</Link>
                    <Link className={'d-lg-none'} to={'/sign-up'}>Create a new Account? <span
                        className={'text-primary'}>Sign Up</span></Link>
                    <button onClick={() => {
                        UserLogin()
                    }}>Sign In
                    </button>
                </div> : <></>}
                {login === 'forget' ? <div className={'form'}>
                    <h3 className={'mb-5 h3'}>Password Forget</h3>
                    <input placeholder="Username/Mobile" required="" className={''}/>
                    <Link to={'/'} onClick={() => {
                        setLogin('login')
                    }}>Already Have an Account? <span className={'text-primary'}>Sign in</span></Link>
                    <button onClick={() => ForgetPassword()} className={''}>Continue</button>
                </div> : <></>}
                {otpView.otpscreen ? <div className={'form'}>
                    <h3 className={'mb-5 h3'}>OTP Verification</h3>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        inputStyle={{
                            width: "100%",
                            height: "3.5rem",
                            margin: "0 5px",
                            fontSize: "3rem",
                            borderRadius: 4,
                            border: "1px solid rgba(0,0,0,0.3)",
                        }}
                        numInputs={4}
                        separator={<span>-</span>}
                        isInputNum={true}
                    />
                    <p>Resend OTP</p>
                    <p className={'my-0'}>Already Have an Account? <span onClick={() => {
                        setLogin('login');
                        setOtpVIew({otpscreen: false})
                    }} style={{cursor: 'pointer'}} className={'text-primary'}> Sign In</span></p>
                    <Button className={'mt-4 py-2'} variant={'contained'} color='primary' onClick={()=>{history.push('/dashboard')}}>Continue</Button>
                </div> : <></>}

            </div>
        </>
    )
}