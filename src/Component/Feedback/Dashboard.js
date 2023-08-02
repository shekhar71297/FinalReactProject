//by using function component
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FeedDash = () => {
    const [feedback, setFeedback] = useState([]);
    const [show, setShow] = useState(false);

    //we have to create new state to show records of single elements
    const [selectedFeedback, setSelectedFeedback]= useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (data) => {setShow(true)
        setSelectedFeedback(data);
    };

    useEffect(() => {
        fetchData();
    }, [])

    //to get data from server
    const fetchData = () => {
        axios.get('http://localhost:8888/feedback').then((res) => {
            console.log(res.data);
            setFeedback(res.data);
        })
    };

    return (
        <div>
            <div className='row'>
                <div className='col-sm-6'>
                    <Link to='/feedback' className='btn btn-primary mb-2' >Feedback </Link>
                </div>

                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Organization</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback.map((data, index) => {
                                return <tr key={index}>
                                    <td>{data.id}</td>
                                    <td>{data.fname}</td>
                                    <td>{data.contact}</td>
                                    <td>{data.org}</td>
                                    <td>
                                        <button type='button' onClick={()=> handleShow(data)} className='btn btn-outline-primary btn-sm'><i class="fa fa-solid fa-eye"></i></button>   &nbsp;
                                        {/* <Link to={`/edit/${data.id}`} className='btn btn-outline-success btn-sm'>
                                            <a href='#editsection'> <i class='fa fa-pencil-square-o' aria-hidden='true'></i> </a>
                                        </Link>  &nbsp; */}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Feedback Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedFeedback && (
                                <table>
                                    <tr>
                                        <td>Student Id : </td><td>{selectedFeedback.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Name : </td><td>{selectedFeedback.fname}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact : </td><td>{selectedFeedback.contact}</td>
                                    </tr>
                                    <tr>
                                        <td>Organization : </td><td>{selectedFeedback.org}</td>
                                    </tr>
                                    <tr>
                                        <td>1.What did you enjoy the most about the tranning? : </td><td>{selectedFeedback.queOne}</td>
                                    </tr>
                                    <tr>
                                        <td>2. Please list 2-3 key learnings from course curriculum, and how you anticipate applying them to your work in the future. : </td><td>{selectedFeedback.queTwo}</td>
                                    </tr> 
                                    <tr>
                                        <td>3. Was there any subject matter that you found confusing? If so, please provide specific examples. : </td><td>{selectedFeedback.queThree}</td>
                                    </tr> 
                                    <tr>
                                        <td>4. What is the most valuable thing you learned in course (knowledge or skills)? : </td><td>{selectedFeedback.queFour}</td>
                                    </tr> 
                                    <tr>
                                        <td>5. Overall how is the faculty feedback? Any specific comments about faculty? : </td><td>{selectedFeedback.queFive}</td>
                                    </tr> 
                                    <tr>
                                        <td>6. Any additional comments you wish to share? : </td><td>{selectedFeedback.queSix}</td>
                                    </tr>

                                </table>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>

            </div>

        </div>
    )
}

export default FeedDash