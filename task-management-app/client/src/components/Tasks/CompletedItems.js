import React from 'react'
import axios from 'axios'

const CompletedItems = (props) => {

  const handleDelete = (Tasks) => {
    axios.delete(`/Tasks/${Tasks._id}`,
      {headers: {token: localStorage.getItem('token')}})
        .then(res => {
          props.updateCompletedList(res.data.Tasks)
        })
  }

  return(
    <div className="d-flex align-items-center justify-content-between my-2 w-100 border border-secondary p-2 rounded-sm">
      <p className="mb-0 text-secondary"><s>{props.Tasks.title}</s></p>
      <i className="bi bi-trash-fill cursor text-primary" onClick={() => {handleDelete(props.Tasks)}} ></i>
    </div>
  )
}

export default CompletedItems
