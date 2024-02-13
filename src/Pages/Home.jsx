import React, { useEffect, useState } from 'react'
import TitleImage from '../Assets/tenor.gif'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectCard from '../Components/ProjectCards';
import { Link } from 'react-router-dom';
import { getHomeProjectAPI } from '../Services/allAPI';
function Home() {
  //to hold 3 home project details
  const [homeProject, setHomeProject] = useState({})
  //APi callto get home project details from mongo db
  const getHomeProject = async () => {
    const result = await getHomeProjectAPI()
    console.log(result);
    if (result.status == 200) {
      setHomeProject(result.data)//array of project
    }
    else {
      console.log(result.response.message);
    }
  }
  useEffect(() => {
    getHomeProject()
  }, [])
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6 mt-5">
            {/*content*/}
            <h1 className='text-center m-4'>Project Fair</h1>
            <p style={{ textAlign: 'justify' }}>
              Project management is the use of specific knowledge, skills, tools and techniques to deliver something of value to people.The development of software for an improved business process, the construction of a building, the relief effort after a natural disaster, the expansion of sales into a new geographic market—these are all examples of projects.
            </p>
            <div className='text-center'>
              <Link to={'/login'}>
                <button className='btn btn-outline-primary m-3 btn-lg rounded-pill shadow'>Get Started</button>
              </Link>
            </div>
          </div>
          <div className="col-6">
            {/*image*/}
            <img src={TitleImage} alt="" style={{ height: '500px' }} />
          </div>
        </div>
        <div class="row d-flex ">
          <div className="col">
            <h2 className='text-center m-4'>Explore Our Projects</h2>
            <marquee behavior="" direction="">
              <div>
                <Row>
                  {homeProject.length > 0 ? homeProject.map((item) => (
                    <Col><ProjectCard projects={item}/></Col>
                  )) : "empty"
                  }
                </Row>
              </div>

            </marquee>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home