const user = require('../data/db-config');

module.exports = {
  add,
  findByUsername,
  find
}

function findById(id){
  return user('users').where({id})
}

function add(newUser){
  return user('users').insert(newUser)
}

function findByUsername(username){
  return user('users').where({username})
}

function find(){
  return user('users')
}