import React, { useState} from 'react';
import OtpInput from 'react-otp-input';

export default function OtpVerification(){
 const [otp,setOtp] = useState();

        return (
            <OtpInput
                value={otp}
                onChange={(otp)=>{setOtp(otp)}}
                numInputs={6}
                separator={<span>-</span>}
            />
        );
    }
