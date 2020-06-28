exports.realTime = io => {
  const Stream = require('../models/streams.js')

  let clients = 0
  io.on('connect' ,socket => {
    clients++
    console.log('connected: ', clients)

    Stream.watch().on('change', async change => {
      const data = change.documentKey 
      const msg = await Stream.findOne({ _id: data._id })
      console.log(msg)
      socket.emit('new message', msg)
    })
  })
}