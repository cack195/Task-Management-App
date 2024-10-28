import React from 'react'
import axios from 'axios'

const TasksItem = (props) => {

  const markCompleted = (Tasks) => {
    axios.put(`/Tasks/${Tasks._id}`, {},  
    {headers: {token: localStorage.getItem('token')}})
      .then(res => {
        if(res.status === 200){
          props.updateTasksList(res.data.Tasks)
        }
      })
  }

  return(
    <div className="d-flex align-items-center justify-content-between my-2 w-100 border border-secondary p-2 rounded-sm">
      <p className="mb-0 font-weight-bolder">{props.Tasks.title}</p>
      <input 
        type="checkbox"
        onClick={() => markCompleted(props.Tasks)} 
      />
    </div>
  )
}

export default TasksItem
