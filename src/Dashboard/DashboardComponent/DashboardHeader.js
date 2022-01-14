import React from "react";
import clsx from 'clsx';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {Button,makeStyles,Badge,Menu , MenuItem ,Avatar } from "@material-ui/core";
import DehazeIcon from '@material-ui/icons/Dehaze';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {DashboadNav} from "../../MainComponents/SideNav";
import Drawer from "../../MainComponents/Drawer";
import {Themes} from  '../../Theme/theme';
import logo from "../../Images/dashLogo.jpg";
import '../../Website/Component/headerCss.css';

export default function HeaderWeb() {
    const histroy = useHistory();
    const classes = styles();
    const [userLogin, setUserLogin] = React.useState(null);
    return (<>
        <nav className="navbar navbar-expand-lg navbar-light header d-none d-xl-block"style={{background:Themes.MainHeaderColor}}>
            <div className={clsx("container-fluid",)} style={{background:Themes.MainHeaderColor}}>
                <Link to={'/'} className="navbar-brand"><img src={logo} alt="logo" className={classes.Logo}/></Link>
                <Button className=" d-lg-none text-light" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <DehazeIcon/></Button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {DashboadNav.map((value => (
                            <li className="nav-item dropdown" key={value.id}>
                                {value.page==='/study-material'?<><Badge className={classes.Badge}color="secondary" badgeContent={'Free'}/></>:<></>}
                                {!(value.title==='Log Out')?<NavLink to={value.page} activeClassName={'active_link'} className="nav-link">{value.title}</NavLink>:<></>}
                            </li>
                        )))}
                        <li className="nav-item dropdown">
                            <NavLink activeClassName={'active_link'} to={'/notification'} className="nav-link">  <Badge badgeContent={4} color="secondary" className={'mx-3 mx-lg-0'}>
                            <NotificationsIcon/>
                            </Badge></NavLink></li>
                        <li className="nav-item dropdown">
                            <Button className='mt-1 mx-1' aria-controls="simple-menu" aria-haspopup="true" onClick={(event)=>{setUserLogin(event.currentTarget)}}>
                                <Avatar alt="Remy Sharp" src="https://media-exp1.licdn.com/dms/image/C4E03AQENlMNKH9CE0w/profile-displayphoto-shrink_200_200/0/1634066552225?e=1647475200&v=beta&t=2WaAjJJUXoHhK3P4gTa1jU5Z542bB1iC9IwF9nJdM-0"/>
                            </Button>
                            <Menu id="simple-menu" anchorEl={userLogin} keepMounted open={Boolean(userLogin)} onClose={(event)=>{setUserLogin(null)}}>
                                <MenuItem onClick={()=>{setUserLogin(null)}}>Profile</MenuItem>
                                <MenuItem onClick={()=>{setUserLogin(null)}}>My account</MenuItem>
                                <MenuItem onClick={()=>{setUserLogin(null);histroy.push('/login')}}>Logout</MenuItem>
                            </Menu></li>
                    </ul>
                </div>
            </div>
        </nav>
    <div className={'d-xl-none'}><Drawer background={Themes.SecondHeaderColor} component={DashboadNav}/></div>
</>
);
}
const styles = makeStyles((theme)=>({
        Badge:{
        position:'absolute',
        left:20,
        top:14,

    },
    Logo:{
            width:'200px',
        height:'70px',
        position:'absolute',
        top:'0',
        left:0
    }
}))