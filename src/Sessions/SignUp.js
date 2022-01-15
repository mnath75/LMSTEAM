import React, {useState} from "react";
import {Button} from "@material-ui/core";
import OtpInput from 'react-otp-input';
import './FormStyle.css';
import SocialLogin from "./SocialLogin";
import {Link , useHistory} from "react-router-dom";
export default function SignUp(){
    const history = useHistory();
    const [state,setState] = useState(true);
    const [otp,setOtp] = useState();

    return(
        <>
            <div className="sign-up my-2">
                {state? <div className={'form'}>
                    <h3 className={'h3'}>Create Account</h3>
                    <SocialLogin/>
                    <p>or use your email for registration</p>
                    <input type="text" name="txt" placeholder="Name" required=""/>
                    <input type="text" name="txt" placeholder="Email" required=""/>
                    <input type={'number'}  placeholder="Mobile" required=""/>
                    <input type="password" name="pswd" placeholder="Password" required=""/>
                    <input  name="pswd" placeholder="Confirm Password" required=""/>
                    <Link to={'/login'} className={'d-lg-none'}>Already Have an Account? <span className={'text-primary'}>Sign in</span></Link>
                    <button onClick={() => {setState(false)}}>Sign Up</button>
                </div>:<>
                    <div className={'form'}>
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
                    <p  className={'my-0'}>Create a new account? <span onClick={() => {setState(true)}} style={{cursor:'pointer'}} className={'text-primary'}> Sign Up</span></p>
                    <Button onClick={()=>{history.push('/login')}} className={'mt-4 py-2'} variant={'contained'} color='primary'>Continue</Button>
                </div></>}
            </div>
        </>
    )
}