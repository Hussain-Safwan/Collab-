const router = require('express').Router()
const Stream = require('../models/streams.js')
const { CurrentUser } = require('../User')
const auth = require('../config/auth')

router.get('/:id', async (req, res) => {
  const data = await Stream.find({ participents: {
    $in: [req.params.id]
  } })
  res.send(data)
})

router.post('/create', async(req, res) => {
  const { title, owner_id, owner_name } = req.body
  let participents = []
  participents.push(owner_id)
    const obj = {
      title,
      participents,
      owner_id,
      owner_name,
      messages: []
    }

    const stream = new Stream(obj)
    console.log(stream)
    await stream.save()

    res.send({
      status: true,
      msg: 'stream created'
    })
})

router.get('/delete/:id', async (req, res) => {
  await Stream.findByIdAndDelete(req.params.id)
  res.send({
    status: true,
    msg: 'stream deleted'
  })
})

router.post('/send', async (req, res) => {
  const { text, sender_id, sender_name, stream_id, category } = req.body
  const Msg = {
    sender_id,
    sender_name,
    text,
    category
  }
  await Stream.findOneAndUpdate({ _id: stream_id }, {
    $push: {
      messages: Msg
    }
  })

  res.send({
    status: true,
    msg: 'sent'
  })
})

router.get('/single/:id', async (req, res) => {
  const data = await Stream.findOne({ _id: req.params.id })
  res.send(data)
})

router.get('/join/:stream_id/:user_id', async (req, res) => {
  const { stream_id, user_id } = req.params
  await Stream.findOneAndUpdate({ _id: stream_id }, {
    $push: {
      participents: user_id
    }
  })

  const newStream = await Stream.findById(stream_id)

  res.send({
    status: true,
    newStream
  })
})

module.exports = router