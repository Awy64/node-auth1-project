const router = require('express').Router();
const users= require('./users-model')
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

  try{
    let newUser = req.body
    const hash = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hash
    const added = await users.add(newUser)
    res.status(201).json({message: 'New User Created.'})
  } catch{
    res.status(500).json({err: 'cannot add new user at this time.'})
  }
})


router.post('/login', async (req, res) => {
  let {username, password} = req.body
  try{
    const user = await users.findByUsername(username).first();
    console.log(user)
    if(user && bcrypt.compareSync(password, user.password)) {
      console.log('passed')
      req.session.user = user;
      console.log(req.session.user)
      res.status(200).json({message: `Welcome ${user.username}`});
    }else{
      res.status(401).json({message: 'you shall not pass'})
    }


  }catch (err) {
    res.status(500).json({err : err, Message: "cant login at this time."})
  }
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if(err){
        res.status(400).json({message: 'error loggin out: ', error: err})
      }else{
        res.json({message: 'logged out'})
      }
    })
  }else{
    res.end();
  }
})








module.exports = router;