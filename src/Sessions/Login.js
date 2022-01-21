import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {Link , useHistory,Redirect} from 'react-router-dom'
import OtpInput from 'react-otp-input';
import SocialLogin from "./SocialLogin";
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser,makeLogin} from "../services/Slices/UserSlice";
import {crud} from "../services/crud";
import './FormStyle.css';
export default function Login() {
    const history = useHistory();
    const  isAuthenticated = useSelector(selectUser);
    const dispatch=useDispatch();
    const [login, setLogin] = useState('login');
    const [otpView, setOtpVIew] = useState({
        otpscreen: false,
        value: ''
    })
    const [params , setParams] = useState({
        username:"",
        password:""
    });
    const [otp, setOtp] = useState();
    function ForgetPassword() {
        setLogin('false');
        setOtpVIew({
            otpscreen: true,
            value: 2
        });
    }
    const loginFunction = async ()=>{
        const {username, password} = params
        let error = [];
        if(!username)
            error.push("The username field is required");
        if(!password)
            error.push("The password field is required");
        if(!_.isEmpty(error)){
            crud.notify({
                message: error[0],
                type: "error"
            });
        }else{
            try {
                await dispatch(makeLogin(params));
                setLogin('false');
                setOtpVIew({
                    otpscreen: true,
                    value: 1
                });

            } catch (e) {
                console.log(e)
            }
        }
    }
    if(!(_.isEmpty(isAuthenticated))){
        return <Redirect to='/dashboard'/>
    }
    return (
        <>
            <div className="sign-in d-flex justify-content-center">
                {login === 'login' ?
                    <div className={'form'}>
                    <h1 className={'h3'}>Sign in</h1>
                    <SocialLogin/>
                    <p>or use your account</p>
                    <input placeholder="Username/Mobile" name="username"   value={params.username}
                           onChange={
                        e => {
                            const {value: username} = e.target;
                            setParams(params => ({
                                ...params,
                                username
                            }));
                        }
                    }/>
                    <input type="password" name="password" placeholder="Password" value={params.password}
                           onChange={(e) => {
                               const {value: password} = e.target;
                               setParams(params => ({
                                   ...params,
                                   password
                               }));}}/>
                    <Link to={'/'} onClick={() => {
                        setLogin('forget')
                    }}>Forget your Password?</Link>
                    <Link className={'d-lg-none'} to={'/sign-up'}>Create a new Account? <span
                        className={'text-primary'}>Sign Up</span></Link>
                    <button onClick={() => {loginFunction();
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