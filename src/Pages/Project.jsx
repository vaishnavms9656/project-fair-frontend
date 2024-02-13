import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectCards from '../Components/ProjectCards';
import { getAllProjectAPI } from '../Services/allAPI';
import { editProjectResponseContext } from '../ContextApi/ContextShare';

function Project() {

  const [allProjects, setAllprojects] = useState({})//to hold all projects
  //api call
  const allProject = async () => {

    //get tokenfrom sessionstorage
    const token = sessionStorage.getItem("token")
    if (token) {
      var reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }
    try {
      const result = await getAllProjectAPI(reqHeader)
      console.log(result);
      if (result.status === 200) {
        setAllprojects(result.data)
        console.log(allProjects);
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

  useEffect(() => {
    allProject()
  }, [])
  return (
    <div>
      <div className="container">
        <h1 className='text-center m-4'>All Projects</h1>
        <div className="d-flex justify-content-center">
          <div className='d-flex mb-5 border border-4 rounded bg-white'>
            <input type="text" className='form-control' placeholder='Search By Technology' />
            <i class="fa-solid fa-magnifying-glass fs-3 p-2"></i>
          </div>
        </div>


          <Row>
            {allProjects.length > 0 ? (
              allProjects.map((item, index) => (
                <Col key={index}><ProjectCards projects={item} /></Col>
              )
              )) : (
              <div className="text-center">no projects found</div>
            )
            }
          </Row>


      </div>
    </div>
  )
}

export default Project