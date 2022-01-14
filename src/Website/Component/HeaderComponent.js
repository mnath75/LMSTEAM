import React from "react";
import logo from "../../Images/logo.png";
import {Link , useHistory} from 'react-router-dom';
import {Themes} from  '../../Theme/theme'
import {Button,makeStyles,Badge } from "@material-ui/core";
import DehazeIcon from '@material-ui/icons/Dehaze';
import {WebsiteNav} from "../../MainComponents/SideNav";
import Drawer from "../../MainComponents/Drawer";
import './headerCss.css';
import clsx from 'clsx';
export default function HeaderWeb() {
    const histroy = useHistory();
    const classes = styles()
    return (
        <>
    <nav className="navbar navbar-expand-lg navbar-light header d-none d-xl-block"style={{background:Themes.MainHeaderColor}}>
        <div className={clsx("container-fluid",)} style={{background:Themes.MainHeaderColor}}>
            <Link to={'/'} className="navbar-brand"><img src={logo} alt="logo" className="logo"/></Link>
            <Button className="d-lg-none text-light" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <DehazeIcon/></Button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <Link to={'/online-courses'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false"> Online Courses
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item">JEE Mains</Link></li>
                            <li><Link to={'/'} className="dropdown-item">NEET</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to={'/'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                              data-bs-toggle="dropdown" aria-expanded="false">Live Tests</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item" >JEE Mains</Link></li>
                            <li><Link to={'/'} className="dropdown-item">NEET</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Badge className={classes.Badge}color="secondary" badgeContent={'Free'}/>
                        <Link to={'/'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">Classes</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item">JEE Mains</Link></li>
                            <li><Link to={'/'} className="dropdown-item">NEET</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Badge className={classes.Badge}color="secondary" badgeContent={'Free'}/>
                        <Link to={'/'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">Practice</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item">JEE Mains</Link></li>
                            <li><Link to={'/'} className="dropdown-item">NEET</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Badge className={classes.Badge}color="primary" badgeContent={'New'}/>
                        <Link to={'/'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">Chalenge Zone</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item">JEE Mains</Link></li>
                            <li><Link to={'/'} className="dropdown-item">NEET</Link></li>
                        </ul>
                    </li>

                    <li className="nav-item dropdown">
                        <Badge className={classes.Badge}color="primary" badgeContent={'New'}/>
                        <Link to={'/'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">Just Ask</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item">Action</Link></li>
                            <li><Link to={'/'} className="dropdown-item">Another action</Link></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><Link to={'/'} className="dropdown-item">Something else here</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Badge className={classes.Badge}color="primary" badgeContent={'New'}/>
                        <Link to={'/'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">E-Books</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item">JEE Mains</Link></li>
                            <li><Link to={'/'} className="dropdown-item">NEET</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Badge className={classes.Badge}color="primary" badgeContent={'New'}/>
                        <Link to={'/'} className="nav-link dropdown-toggle"  id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">Learn & Earn</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item">JEE Mains</Link></li>
                            <li><Link to={'/'} className="dropdown-item">NEET</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to={'/'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">Exam Alerts</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={'/'} className="dropdown-item">JEE Mains</Link></li>
                            <li><Link to={'/'} className="dropdown-item">NEET</Link></li>
                        </ul>
                    </li>
                    <Button onClick={()=>{histroy.push('login')}} variant={'contained'} className={clsx(classes.webBtn,'mx-2')}>Login</Button>
                  <Button onClick={()=>{histroy.push('sign-up')}} variant={'contained'} className={classes.webBtn}>Sign Up</Button>
                </ul>
            </div>
        </div>
    </nav>
            <div className={'d-xl-none'}><Drawer background={Themes.MainHeaderColor} component={WebsiteNav}/></div>
        </>
    );
}
const styles = makeStyles((theme)=>({
    webBtn:{
        height:30,
        marginTop:20,
        background:Themes.WHITE,
    },
    Badge:{
        position:'absolute',
        right:30,
        top:'50%',
        [theme.breakpoints.up("sm")]: {
            left:20,
            top:10,
        },
    }
}))