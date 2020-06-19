const router = require('express').Router()
const {userModel} = require('../models/users')
const {contactModel} = require('../models/contacts')
const {check, validationResult} = require('express-validator/check')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
  const contacts = await contactModel.find({user_id: req.user.id}).sort({_id: -1})
  res.send(contacts)
})

router.put('/update/:id', (req, res) => {
  const msg = id + ' update'
  res.send(id)
})

router.put('/delete/:id', (req, res) => {
  const msg = id + ' delete'
  res.send(id)
})

router.post('/', auth, async (req, res) => {
  const obj = {
    user_id: req.user.id,
    ...req.body
  }
  const newContact = new contactModel(obj)
  await newContact.save()
  console.log(newContact)
  res.json('New contact added'    )
})

router.get('/create/:id', async (req, res) => {
  const id = req.params.id
  const data = await contactModel.findOne({ _id: id })
  const body = data.body

  const fs = require('fs')
  fs.writeFile(id, body, () => {
    res.send('created')
  })
})

module.exports = router