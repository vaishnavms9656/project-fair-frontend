import React from 'react'


function MyProfile() {
  return (
    <div className='text-center card shadow m-3 py-3'>
      <h3>My Profile</h3>
      <label>
        <input type="file" style={{ display: 'none' }} />
        <img src="https://th.bing.com/th/id/R.c11b6f38dffc24a4508217513b0e50bd?rik=Pt%2bkITlukiMkWg&riu=http%3a%2f%2fwww.emmegi.co.uk%2fwp-content%2fuploads%2f2019%2f01%2fUser-Icon.jpg&ehk=zjS04fF4nxx%2bpkvRPsSezyic3Z7Yfu%2fuoT75KnbNv1Y%3d&risl=&pid=ImgRaw&r=0" width={'100px'} height={'100px'} alt="" />
      </label>
      <div className="w-50" style={{ marginLeft: '170px' }}>
        <input type="text" placeholder='User Name' className='form-control mb-3' />
        <input type="text" placeholder='Git Hub' className='form-control mb-3' />
        <input type="text" placeholder='Linkedin' className='form-control mb-3' />
      </div>
    </div>
  )
}

export default MyProfile