import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from 'react-redux';
import {selectUser} from "./services/Slices/UserSlice";
import _ from "lodash";
import DashboardHeader from "./Dashboard/DashboardComponent/DashboardHeader";
const PrivateRouter = ({Component, ...rest}) => {
    const isAuthenticated = useSelector(selectUser);
    return (
        <>
            <Route  {...rest} render={(props) => (
                !(_.isEmpty(isAuthenticated)) ?
                    <>
                        <DashboardHeader/>
                        <div className={'mt-3'}>
                            <Component {...props}/>
                        </div>
                        )
                    </>
                : (
                        <Redirect to='/login'/>
                    )
            )}/>
        </>
    )
}
export default PrivateRouter;