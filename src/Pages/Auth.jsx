import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/allAPI'
function Auth({ register }) {
  const isRegisterFrom = register ? true : false
  //state creation
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const location = useNavigate();
  //register function
  const registerData = async () => {
    const { username, email, password } = userData
    if (!username || !email || !password) {
      alert("Please Enter Valid Details")
    }
    else {
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status == 200) {
        alert(`${result.data}`)
        location('/login')
      }
      else {
        alert(result.response.data)
      }
    }
    console.log(userData);
  }
//login function
const loginData=async()=>{
  const { email, password } = userData
  if (!email || !password) {
    alert("Please Enter Valid Details")
  }
  else {
    const result = await loginAPI(userData)
      console.log(result);
    if (result.status == 200) {
      alert(`Login successfull`)
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
      sessionStorage.setItem("token",result.data.token)
      location('/dashboard')

    }
    else {
      alert(result.response.data)
    }
  }
}
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '100%', height: '500px' }}>
        <div className="container">
          <div className="row">
            <div className="col">
              {/* image */}
              <img src="https://i.pinimg.com/originals/1b/1e/37/1b1e37721cf248b07ae7ed07966df60b.gif" alt="" width={'500px'} />
            </div>
            <div className="col p-3 shadow">
              {/* input */}
              <h3 className='text-center'>Project Fair</h3>
              <h5 className='m-3 text-center'>
                {
                  isRegisterFrom ? 'Register Here' : 'Login Here'
                }
              </h5>
              <form action="">
                {
                  isRegisterFrom &&
                  <input type="text" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} placeholder='Enter Name' className='form-control mb-3' />
                }
                <input type="text" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} placeholder='Enter Email' className='form-control mb-3' />
                <input type="text" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} placeholder='Enter Password' className='form-control mb-3' />
              </form>
              {
                isRegisterFrom ?
                  <div className="text-center m-3">
                    <button className='btn btn-success' onClick={registerData}>Register</button>
                    <Link to={'/login'} style={{ textDecoration: 'none' }}
                    >
                      <p className='m-3'> Already Registered ? Please Login From Here</p>
                    </Link>
                  </div>
                  :
                  <div className="text-center m-3">
                    <button className='btn btn-success' onClick={loginData}>Login</button>
                    <Link to={'/register'} style={{ textDecoration: 'none' }}
                    >
                      <p className='m-3'>New to Here ? Please Register From Here</p>
                    </Link>
                  </div>
              }
            </div>
          </div>
        </div>
        <div className='text-center'>
          <Link to={'/'}>
            <button className='btn btn-outline-primary m-3 btn-lg rounded-pill shadow'>Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Auth