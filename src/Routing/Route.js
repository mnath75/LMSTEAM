import React from "react";
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import PrivateRouter from "../PrivateRouter";
import Form from '../Sessions/Form';
import Dashboard from "../Dashboard/Pages/Dashboard";
import Courses from "../Dashboard/Pages/Courses";
import QuestionBank from "../Dashboard/Pages/QuestionBank";
export default function Routing() {
    return(
<>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact  component={Form}/>
            <Route path="/login" exact  component={Form}/>
            <Route path="/sign-up" exact  component={Form}/>
            <PrivateRouter Component={Dashboard} path={'/dashboard'} exact/>
            <PrivateRouter Component={Courses} path={'/courses'} exact/>
            <PrivateRouter Component={QuestionBank} path={'/question-bank'} exact/>
        </Switch>
    </BrowserRouter>
    </>
    )
}