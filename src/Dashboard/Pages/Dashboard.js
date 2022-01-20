import React from 'react';
import SideTable from '../DashboardComponent/DashboardSideTable';
import MiddleFirst from "../DashboardComponent/MiddleFirst";
import Rightsidebar from "../DashboardComponent/Rightsidebar";
export default function Dashboard() {
    return (
        <>
            <div className={'container-fluid px-3'}>
                <div className={'row'}>
                    <div className={'col-12 col-md-5 col-lg-3 col-xl-2 my-2'}>
                        <SideTable/>
                    </div>
                    <div className={'col-12 col-md-7 col-lg-9 col-xl-8'}>
                      <div>  <MiddleFirst/></div>
                    </div>
                    <div className={'col-12 col-xl-2'}>
                        <Rightsidebar />
                    </div>
                </div>
            </div>
        </>
    )
}