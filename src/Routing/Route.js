import React from "react";
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import PrivateRouter from "../PrivateRouter";
import Form from '../Sessions/Form';
import Dashboard from "../Dashboard/Pages/Dashboard";
import Courses from "../Dashboard/Pages/Courses";
import QuestionBank from "../Dashboard/Pages/QuestionBanks";
import QuestionCourse from '../Dashboard/QuestionBankComponent/QuestionCourse'
import QuestionSubjects from "../Dashboard/QuestionBankComponent/QuestionSubjects";
import QuestionTopic from "../Dashboard/QuestionBankComponent/QuestionTopic";
import QuestionType from "../Dashboard/QuestionBankComponent/QuestionType";
import QuestionPage from "../Dashboard/QuestionBankComponent/QuestionsPage";
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
            <PrivateRouter Component={QuestionCourse} path={'/question-course/:id'} exact/>
            <PrivateRouter Component={QuestionSubjects} path={'/question-subject'} exact/>
            <PrivateRouter Component={QuestionTopic} path={'/question-topic'} exact/>
            <PrivateRouter Component={QuestionType} path={'/question-type'} exact/>
            <PrivateRouter Component={QuestionPage} path={'/question-page'} exact/>
        </Switch>
    </BrowserRouter>
    </>
    )
}