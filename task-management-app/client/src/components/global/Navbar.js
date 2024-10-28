import React from 'react'
import Logout from '../auth/Logout'

const Navbar = () => {
  return(
    <div className="d-flex justify-content-between bg-primary p-3 text-white">
      {/* <a className="text-white" href="https://github.com/cack195" target="_blank" rel="noreferrer" ><i className="bi bi-github"></i></a> */}
      <p className="mb-0 font-weight-bold">Task Management App</p>
      <Logout />
    </div>
  )
}

export default Navbar