import express from 'express'
const router = express.Router()

import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

router.post('/signup', (req, res) => {
  const username = req.body.username
  const password = bcrypt.hashSync(req.body.password, 10)

  const newUser = new User({username, password})

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {

    if(err) return res.status(500).json({
      title: 'server error',
      error: err
    })

    if(!user) {
      return res.status(400).json({
        title: 'user is not found',
        error: 'invalid username or password'
      })
    }

    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({
        title: 'login failed',
        error: 'invalid username or password'
      })
    }

    let token = jwt.sign({userId: user._id}, 'secretkey')
    return res.status(200).json({
      title: 'login successful',
      token: token
    })
  })
})

router.get('/user', (req, res) => {
  let token = req.headers.token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if(err) return res.status(401).json({
      title: 'not authorized'
    })

    User.findOne({_id: decoded.userId}, (err, user) => {
      if(err) return console.log(err)
      return res.status(200).json({
        title: 'success',
        user: {
          username: user.username
        }
      })
    })
  })
})

export default router
