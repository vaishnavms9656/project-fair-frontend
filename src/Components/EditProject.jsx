import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/tenor.gif'
import { base_Url } from '../Services/base_Url';
import { editUserProjectsAPI } from '../Services/allAPI';
import { editProjectResponseContext } from '../ContextApi/ContextShare';


function EditProject({ project }) {
    const {editProjectRes,setEditProjectRes}=useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //to hold project details
    const [projectDetails, setProjectDetails] = useState({
        id: project._id, title: project.title, language: project.language, github: project.github, link: project.link, overview: project.overview, projectImage: ""
    })
    console.log(project);
    console.log(projectDetails);
    //to hold image url
    const [preview, setPreview] = useState("")
    console.log(preview);
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    const updateProject = async () => {
        const { id, title, language, github, link, overview, projectImage } = projectDetails
        if (!title || !language || !github || !link || !overview ) {
            alert("please enter details")
        }
        else {
            //api call
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("link", github)
            reqBody.append("overview", overview)
            preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)
            const token = sessionStorage.getItem("token")
            console.log(token);
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                //api call
                const result = await editUserProjectsAPI(id, reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    setEditProjectRes(result.data)
                    alert("project Details updated")
                    console.log(result.data);
                    handleClose()
                }

                else {
                    console.log(result.response.data);
                }

            }
            else{
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                //api call
                const result = await editUserProjectsAPI(id, reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    setEditProjectRes(result.data)
                    console.log(result.data);
                    alert("project Details updated")
                    handleClose()
                }

                else {

                    console.log(result.response.data);
                }

            }
        }
    }

    return (
        <div>
            <button className='btn btn-success' onClick={handleShow}><i className='fa-solid fa-pen'></i></button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            {/* image */}
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img src={preview ? preview : `${base_Url}/uploads/${project.projectImage}`} width={'300px'} height={'300px'} alt="" />
                            </label>
                        </div>
                        <div className="col">
                            {/* input */}
                            <div className="input">
                                <input type="text" value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} placeholder='Project Title' className='form-control mb-3' />
                                <input type="text" value={projectDetails.language} onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} placeholder='Language Used' className='form-control mb-3' />
                                <input type="text" value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} placeholder='Github Link' className='form-control mb-3' />
                                <input type="text" value={projectDetails.link} onChange={e => setProjectDetails({ ...projectDetails, link: e.target.value })} placeholder='Website Link' className='form-control mb-3' />
                                <input type="text" value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} placeholder='Project Description' className='form-control mb-3' />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={updateProject}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditProject