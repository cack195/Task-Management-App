import React, { useState, useEffect } from 'react'
import Navbar from '../components/global/Navbar'
import TasksForm from '../components/Tasks/TasksForm'
import TasksItem from '../components/Tasks/TasksItem'
import CompletedItems from '../components/Tasks/CompletedItems'
import axios from 'axios'

const Dashboard = (props) => {
  const [username, setUsername] = useState('')
  const [Tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [completedSelected, setCompletedSelected] = useState(false)

  useEffect(() => {
    axios.get('/users/user',
    {headers: 
      {token: localStorage.getItem('token')}
    })
      .then(res => setUsername(res.data.user.username))
  }, [])

  useEffect(() => {
    axios.get('/Tasks',
    {headers:
      {token: localStorage.getItem('token')}
    })
      .then(res => {
        setTasks(res.data.Tasks)
        setCompletedTasks(res.data.Tasks.filter(Tasks => Tasks.completed))
      })
  }, [])

  const addTasks = (newItem) => {
    setTasks(prevState => [...prevState, newItem])
  }

  const updateTasksList = (oldTasks) => {
    setTasks((prevState) => {
      return prevState.filter(Tasks => Tasks._id !== oldTasks._id)
    })
    setCompletedTasks(prevState => [...prevState, oldTasks])
  }

  const updateCompletedList = (deletedItem) => {
    setCompletedTasks((prevState) => {
      return prevState.filter(Tasks => Tasks._id !== deletedItem._id)
    })
  }

  return(
    <div className="" >
      <Navbar />
      <div className="p-3 d-flex flex-column align-items-center customheight">
        <p className="mb-0">Welcome <span className="text-primary font-weight-bolder">{username}</span>, here is your tasks list</p>
        <TasksForm addTasks={addTasks} />

        <div className="card customwidth">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <p className={`nav-link ${!completedSelected ? "active" : "cursor"}`}
                onClick={() => {setCompletedSelected(false)}}
              >Tasks</p>
              </li>
              <li className="nav-item">
                <p className={`nav-link ${completedSelected ? "active" : "cursor"}`}
                onClick={() => {setCompletedSelected(true)}}
              >Completed</p>
              </li>
            </ul>
          </div>
          <div className="card-body">
            { 
              !completedSelected
              ?  Tasks.filter(Tasks => !Tasks.completed).map((Tasks) => {
                return <TasksItem Tasks={Tasks} updateTasksList={updateTasksList} key={Tasks._id} />
                })
              :
                completedTasks.map((Tasks) => {
                  return <CompletedItems Tasks={Tasks} updateCompletedList={updateCompletedList} key={Tasks._id} />
                })              
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard