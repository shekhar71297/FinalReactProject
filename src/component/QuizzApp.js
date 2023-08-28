import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Vouchervalidation from './voucher/Vouchervalidation';
import SelectExam from './SelectExam';
import Instructions from './Instructions';
import StudentLogin from './student/StudentLogin';
import StartExam from './StartExam';
import SubmitExam from './SubmitExam';



function QuizzApp() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StudentLogin />} />
                    <Route path='/quizapp/valid-voucher' element={<Vouchervalidation />} />
                    <Route path='/quizapp/select-exam' element={<SelectExam />} />
                    <Route path='/quizapp/instruction/:examId' element={<Instructions />} />
                    <Route path="/quizapp/start-exam" element={<StartExam/>} />
                    <Route path='/quizapp/exam-submitted' element={<SubmitExam/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default QuizzApp
