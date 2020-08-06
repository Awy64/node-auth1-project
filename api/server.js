const express = require('express');
const server = express();
const usersRouter = require('../users/users-router')
const session = require('express-session')
const restricted = require('../users/restricted-middleware')
const userlist = require('../users/userlist_router')
const knexSessionStore = require('connect-session-knex')(session);
const sessionConfig = {
  name: 'aysession',
  secret: "yayeet",
  cookie: {
    maxAge: 100 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore(
    {
      knex: require('../data/db-config.js'),
      tablename: "sessions",
      sidfilename: 'sid',
      createtable: true,
      clearInterval: 1000* 60 * 60
    }
  )
}



server.use(express.json())
server.use(session(sessionConfig))

server.use('/api/users', restricted, userlist)
server.use('/api', usersRouter)








module.exports = server;