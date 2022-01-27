import React from "react";
import {Route} from "react-router-dom";
import DashboardHeader from "./Dashboard/DashboardComponent/DashboardHeader";
const PrivateRouter = ({Component, ...rest}) => {
    return (
        <>
            <Route  {...rest} render={(props) => (
                    <>
                        <DashboardHeader/>
                        <div className={'mt-xl-2 mt-3'}>
                            <Component {...props}/>
                        </div>

                    </>
            )}/>
        </>
    )
}
export default PrivateRouter;