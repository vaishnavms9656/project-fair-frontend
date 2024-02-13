import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/tenor.gif'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { base_Url } from '../Services/base_Url';

function ProjectCards({projects}) {
    console.log(projects);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Card style={{ width: '18rem' }} className='m-5'>
                <Card.Img onClick={handleShow} variant="top" style={{ height: '200px' }}  src={projects?`${base_Url}/uploads/${projects.projectImage}`:"null"}/>
                <Card.Body>
                    <Card.Title className='text-center'>{projects?.title}</Card.Title>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{projects?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img src={projects?`${base_Url}/uploads/${projects.projectImage}`:"null"} alt="" width={'100%'} />
                        </Col>
                        <Col>
                            <h3>{projects?.title}</h3>
                            <span>
                                <p>
                                    <b>
                                        Project Overview </b>
                                 {projects?.overview}
                                </p>
                                <p>Language Used:
                                    <span>
                                        <b>{projects?.language}</b>
                                    </span>
                                </p>
                            </span>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-evenly'>
                    <Button variant="secondary fs-4">
                        <i class="fa-brands fa-github fa-flip"></i>
                    </Button>
                    <Button variant="primary fs-4">
                        <i class="fa-solid fa-link fa-flip"></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProjectCards