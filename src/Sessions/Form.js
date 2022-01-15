import {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import Login from "./Login";
import SignUp from "./SignUp";
import {Player, Controls} from '@lottiefiles/react-lottie-player';
import HeaderWeb from "../Website/Component/HeaderComponent";
import Particles from "../MainComponents/Particles";
import './FormStyle.css';
import {Themes} from "../Theme/theme";
export default function Form() {
    const history = useHistory();
    const [state, setState] = useState('');
    const path = window.location.pathname;
    useEffect(() => {
        if (path === '/login') {setState('')}
        if (path === '/sign-up') setState('right-panel-active')
    }, [path])
    return (
        <><div className={'d-none d-xl-block'}><Particles/></div>
            <HeaderWeb/>
            <div className={'d-flex justify-content-center align-items-center'} style={{height: '93vh'}}>
                <div className={`container ${state}`}>
                    <SignUp/>
                    <Login/>
                    <div className="overlay-container d-none d-lg-block">
                        <div className="overlay" style={{background:Themes.MainHeaderColor}}>
                            <div className="overlay-left">
                                <Player
                                    autoplay
                                    loop
                                    src="https://assets4.lottiefiles.com/packages/lf20_fwykef3x.json"
                                    style={{height: '250px', width: '270px', marginTop: '25px'}}
                                >
                                    <Controls visible={false}/>
                                </Player>
                                <h3>Wellcome Back!</h3>
                                <p>Enter your personal details and start journey with us</p>
                                <button onClick={() => {
                                    history.push('/login')
                                }}>Sign In
                                </button>
                            </div>
                            <div className="overlay-right">
                                <Player
                                    autoplay
                                    loop
                                    src="https://assets1.lottiefiles.com/private_files/lf30_fw6h59eu.json"
                                    style={{height: '220px', width: '220px', marginTop: '25px', borderRadius: '100%'}}
                                >
                                    <Controls visible={false}/>
                                </Player>
                                <h3 className={'pt-3'}>Hello, Friend</h3>
                                <p>To keep connected with us please login with your personal info</p>
                                <button onClick={() => {
                                    history.push('/sign-up')
                                }}>Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}