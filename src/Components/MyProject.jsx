import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteUserProjectsAPI, getAllUserProjectAPI } from '../Services/allAPI'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { addProjectResponseContext } from '../ContextApi/ContextShare';
import EditProject from './EditProject'
import { editProjectResponseContext } from '../ContextApi/ContextShare';

function MyProject() {
  const { addProjectRes, setAddProjectRes } = useContext(addProjectResponseContext)
  const { editProjectRes, setEditProjectRes } = useContext(editProjectResponseContext)
  //state creation
  const [allUserProject, setAllUserproject] = useState([])
  //api call
  const allUserProjects = async () => {
    //get token from session storage
    const token = sessionStorage.getItem("token")
    console.log(token);
    if (token) {
      var reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }

      try {
        const result = await getAllUserProjectAPI(reqHeader)
        console.log(result);
        if (result.status === 200) {
          setAllUserproject(result.data)
          console.log(allUserProject);
        }
        else {
          alert("failed to retrieve project")
        }
      }
      catch (err) {
        console.log('Error Fetching projets', err);
        alert('failed to retriev projects')
      }
    }
  }
  useEffect(() => {
    allUserProjects()
  }, [addProjectRes, editProjectRes])
  const deleteProjects = async (pid) => {
    //get the token
    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await deleteUserProjectsAPI(pid, reqHeader)
        console.log(result);
        if (result.status === 200) {
          alert("project deleted successfully")
          allUserProjects()
        }
      }
      catch (err) {
        console.log(result.response.data);
      }
    }
  }
  return (
    <div className="container">
      <div className='d-flex'>
        <h3>My Projects</h3>
        <div className='ms-auto'>
          {/* Add project */}
          <AddProject />
        </div>
      </div>
      <div className='mt-4 p-4 border'>
        <Row className='d-flex flex-row'>
          {allUserProject.length > 0 ? (
            allUserProject.map((item, index) => (
              <div className='d-flex justify-content-between my-2'>
                <h5>{item.title}</h5>
                <div className="btn bg-dark">
                  <button className='btn'><EditProject project={item} /> </button>
                  <a href={item.github} target="_blank" className='btn'><i className='fa-brands fa-github'></i></a>
                  <button onClick={() => deleteProjects(item._id)} className='btn'><i className='fa-solid fa-trash'></i></button>
                </div>
              </div>
            ))) : (
            <div className="text-center">no projects found</div>
          )
          }

        </Row>
      </div>

    </div>
  )
}

export default MyProject