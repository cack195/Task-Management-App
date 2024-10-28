import express from 'express'
const router = express.Router()

import jwt from 'jsonwebtoken'
import Tasks from '../models/tasks.model.js'

router.get('/', (req, res) => {
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
    if(err) return res.status(401).json({
      title: 'not authorized'
    })

    Tasks.find({author: decoded.userId}, (err, Tasks) => {
      if(err) return console.log(err)

      return res.status(200).json({
        title: 'success',
        Tasks: Tasks
      })
    })
  })
})

router.post('/', (req, res) => {
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
    if(err) return res.status(401).json({
      title: 'not authorized'
    })

    const author = decoded.userId
    const title = req.body.title
    const isCompleted = false

    const newTasks = new Tasks({author, title, isCompleted})

    newTasks.save(error => {
      if(error) return console.log(error)
      return res.status(200).json({
        title: 'Tasks successfully added',
        Tasks: newTasks
      })
    })
  })
})

router.put('/:TasksId', (req, res) => {
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
    if(err) return res.status(401).json({
      title: 'not authorized'
    })

    Tasks.findOne({author: decoded.userId, _id: req.params.TasksId}, (err, Tasks) => {
      if(err) return console.log(err)

      Tasks.completed = true
      Tasks.save(error => {
        if(error) return console.log(error)

        return res.status(200).json({
          title: 'success',
          Tasks: Tasks
        })
      })
    })
  })
})

router.delete('/:TasksId', (req, res) => {
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
    if(err) return res.status(401).json({
      title: 'not authorized'
    })

    Tasks.findOneAndRemove({author: decoded.userId, _id: req.params.TasksId}, (err, Tasks) => {
      if(err) return console.log(err)

      return res.status(200).json({
        title: 'item removed',
        Tasks: Tasks
      })
    })
  })
})

export default router
