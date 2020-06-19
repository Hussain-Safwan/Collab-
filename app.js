const express = require('express')
const fs = require('fs')
const expressStatusMonitor = require('express-status-monitor')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')
app.use(cors());
const path = require('path')

const socketIO = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketIO(server)

// app.get('/', (req, res) => {
//   res.json('Hello')
// })

app.use(express.json({ extended: false }))
app.use('/auth', require('./routes/auth'))
app.use('/contacts', require('./routes/contacts'))
app.use('/users', require('./routes/users'))

connectDB()

if (process.env.NODE_ENV ==='production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(__dirname, 'client', 'build', 'imdex.html')
  })
}

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Listening at ${PORT}`)
})

// Real time shit!
io.on("connection", (socket) => {
  console.log("New client connected");
  let name 
  socket.on('create', data => {
    const file = JSON.parse(data)
    name = file.name 
    fs.writeFile(file.name, file.contents, () => {
      socket.emit('success', {msg: 'file created'})
      fs.watchFile(file.name, {interval: 100}, (curr, prev) => {
        fs.readFile(file.name, 'utf8', (err, data) => {
          socket.emit('update', data)
        })
      })
    })
  })

  socket.on('update', data => {
    fs.writeFile(name, data, () => {

    })
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    fs.unlink(name, (err, res) => {
      console.log(err, res)
    })
  });
});
