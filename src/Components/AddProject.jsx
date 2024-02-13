import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/tenor.gif'
import { addProjectAPI } from '../Services/allAPI';
import { addProjectResponseContext } from '../ContextApi/ContextShare';

function AddProject() {
  const {addProjectRes,setAddProjectRes}=useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //to hold token
  const [token, setToken] = useState("")
  //get token from session storage
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])
  //to hold project details
  const [projectDetails, setProjectDetails] = useState({
    title: "", language: "", github: "", link: "", overview: "", projectImage: ""
  })
  console.log(projectDetails);
  //to hold image url
  const [preview, setPreview] = useState("")
  console.log(preview);
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  const projectAdd = async () => {
    const { title, language, github, link, overview, projectImage } = projectDetails
    if (!title || !language || !github || !link || !overview || !projectImage) {
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
      reqBody.append("projectImage", projectImage)
      const reqHeader = {
        "Content-Type": "multipart/form-data", //req contains a file upload content (image)
        "Authorization": `Bearer ${token}` //req containstoken for backend
      }
      const result = await addProjectAPI(reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        console.log(result.data);
        alert("Project Added successfully")
        handleClose()//to close the modal after adding project
        setAddProjectRes(result.data)//context access the add project data
        setProjectDetails({ title: "", language: "", github: "", link: "", overview: "", projectImage: "" })//make thw state value empty
        setPreview("")
      }
      else {
        alert(result.response.data);
        console.log(result.response.data);
      }
    }
  }
  return (
    <div>
      <button className='btn btn-success' onClick={handleShow}>Add Project</button>
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
                <img src={preview ? preview : img} width={'300px'} height={'300px'} alt="" />
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
          <Button variant="primary" onClick={projectAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProject