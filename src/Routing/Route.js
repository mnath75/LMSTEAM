import React from "react";
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import PrivateRouter from "../PrivateRouter";
import Form from '../Sessions/Form';
import Dashboard from "../Dashboard/Pages/Dashboard";
import Courses from "../Dashboard/Pages/Courses";
import QuestionBank from "../Dashboard/Pages/QuestionBanks";
import CourseCategory from "../Dashboard/Pages/CourseCategory";
import QuestionCourse from '../Dashboard/QuestionBankComponent/QuestionCourse'
import QuestionSubjects from "../Dashboard/QuestionBankComponent/QuestionSubjects";
import QuestionTopic from "../Dashboard/QuestionBankComponent/QuestionTopic";
import QuestionType from "../Dashboard/QuestionBankComponent/QuestionType";
import QuestionPage from "../Dashboard/QuestionBankComponent/QuestionsPage";
import QuestionPageD from "../Dashboard/QuestionBankComponent/QuestionPageD";
import CourseCourse from "../Dashboard/CoursesComponent/CourseCourse";
import CourseBatch from "../Dashboard/CoursesComponent/CourseBatch";
import BatchDetail from "../Dashboard/CoursesComponent/BatchDetail";
import Students from "../Dashboard/Students/Students";
import ActiveStudents from "../Dashboard/Students/ActiveStudents";

export default function Routing() {
    return(
<>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact  component={Form}/>
            <Route path="/login" exact  component={Form}/>
            <Route path="/sign-up" exact  component={Form}/>
            <PrivateRouter Component={Dashboard} path={'/dashboard'} exact/>
          
            <PrivateRouter Component={CourseCategory} path={'/course-category'} exact/>
            <PrivateRouter Component={CourseCourse} path={'/course-course'} exact/>
            <PrivateRouter Component={CourseBatch} path={'/course-batch'} exact/>
            <PrivateRouter Component={BatchDetail} path={'/batch-detail'} exact/>
            <PrivateRouter Component={Students} path={'/Students'} exact/>
            <PrivateRouter Component={ActiveStudents} path={'/ActiveStudents'} exact/>
            <PrivateRouter Component={QuestionBank} path={'/question-bank'} exact/>
            <PrivateRouter Component={QuestionCourse} path={'/question-course/:id'} exact/>
            <PrivateRouter Component={QuestionSubjects} path={'/question-subject/:id'} exact/>
            <PrivateRouter Component={QuestionTopic} path={'/question-topic/:id'} exact/>
            <PrivateRouter Component={QuestionType} path={'/question-type'} exact/>
            <PrivateRouter Component={QuestionPage} path={'/question-page/:id'} exact/>
            <PrivateRouter Component={QuestionPageD} path={'/question-page-D/:id'} exact/>
        </Switch>
    </BrowserRouter>
    </>
    )
}