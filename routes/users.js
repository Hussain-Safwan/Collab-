const router = require('express').Router()
const {userModel} = require('../models/users')
const {check, validationResult} = require('express-validator/check')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
  res.send('get register')
})

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Passwords msut be of minimum 6 characters').isLength({
    min: 6
  })
],
 async(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array()})
  }

  const {name, email, password} = req.body
  const user = await userModel.findOne({email})
  if (user) {
    return res.send('Email already used')
  }

  const newUser = new userModel(req.body)
  console.log(newUser)
  await newUser.save()

  // jwt operation
  const payload = {
    user: {
      id: newUser._id
    }
  }
  let token
  jwt.sign(payload, 'secret', {
    expiresIn: 360000
  }, (err, tk) => {
    if (err) {
      res.json('JWT Error')
    } else {
      token = tk
      console.log(token)
      return res.send({token})
    }
  })

})

module.exports = router