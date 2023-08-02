import React, { Component } from 'react'
import NavBar from '../../../component/student/NavBar'
import StudentRegistration from '../../../component/student/StudentRegistration'

export class Student extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <StudentRegistration/>
            </div>
        )
    }
}

export default Student
