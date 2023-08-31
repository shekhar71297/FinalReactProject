import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Vouchervalidation from './voucher/Vouchervalidation';
import SelectExam from './SelectExam';
import Instructions from './Instructions';
import StudentLogin from './student/StudentLogin';
import NewStudentRegistration from '../component/student/NewStudentRegistration';
import StartExam from './StartExam';
import SubmitExam from './SubmitExam';
import FeedbackModule from './feedback/FeedbackModule';
import PrivateRoute from './PrivateRoute';



function QuizzApp() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/quizapp/feedback" element={<FeedbackModule/>}/>
                    <Route path="/" element={<StudentLogin />} />
                    <Route path='/quizapp/register' element={<NewStudentRegistration />} />
                    <Route path='/quizapp/valid-voucher' element={<PrivateRoute><Vouchervalidation /></PrivateRoute>} />
                    <Route path='/quizapp/select-exam' element={<PrivateRoute><SelectExam /></PrivateRoute>} />
                    <Route path='/quizapp/instruction/:examId' element={<PrivateRoute><Instructions /></PrivateRoute>} />
                    <Route path="/quizapp/start-exam" element={<PrivateRoute><StartExam/></PrivateRoute>} />
                    <Route path='/quizapp/exam-submitted' element={<SubmitExam/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default QuizzApp
