import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyProject from '../Components/MyProject';
import MyProfile from '../Components/MyProfile';
import { Link } from 'react-router-dom';

function Dashboard() {
const existingUser=JSON.parse(sessionStorage.getItem('existingUser'))
console.log(existingUser);
  return (
    <div>
      <div>
        <Row>
          <h2 className='m-3'>Welcome <span className='text-primary'>l{existingUser.username}</span></h2>
          <Col>
            {/* My projects */}
            <MyProject/>
          </Col>
          <Col>
            {/* My profile */}
            <MyProfile/>
          </Col>
        </Row>
        <Link to={'/project'}>
          <div className='text-center'>
            <button className='btn btn-outline-primary m-3 btn-lg rounded-pill shadow'>View All Projects</button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard