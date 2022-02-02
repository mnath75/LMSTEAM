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
import {notify} from "react-notify-toast";
import Loader from "../MainComponents/Loader";
export default function Login() {
    let error = [];
    const  isAuthenticated = useSelector(selectUser);
    const dispatch=useDispatch();
    const [loader, setLoader] = useState(false);
    const [login, setLogin] = useState('login');
    const [params , setParams] = useState({
        phone:"",
        password:""
    });

    const loginFunction = async ()=>{
        if(!params.phone)error.push("The phone number is required");
        if(!params.password)error.push("The password  is required");
        if(!_.isEmpty(error)){
            notify.show(error[0], "error", 1000);
        }else{
            try {
                setLoader(true);
                await dispatch(makeLogin(params));
                setLoader(false);
            } catch (e) {
                notify.show(e.detail, "error", 1000);
                setLoader(false);
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
                    <input maxLength={10} placeholder="Phone no." name="phone"   value={params.phone}
                           onChange={e => {
                            const {value: phone} = e.target;
                            setParams(params => ({
                                ...params,
                                phone
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
                    <button onClick={() => {loginFunction()}}>Sign In</button>
                </div> : <></>}



                {login === 'forget' ? <div className={'form'}>
                    <h3 className={'mb-5 h3'}>Password Forget</h3>
                    <input placeholder="Username/Mobile" required="" className={''}/>
                    <Link to={'/'} onClick={() => {
                        setLogin('login')
                    }}>Already Have an Account? <span className={'text-primary'}>Sign in</span></Link>
                    <button onClick={() => alert('forget')} className={''}>Continue</button>
                </div> : <></>}


            </div>
            {loader ? <Loader/> : <></>}
        </>
    )
}