const router = require('express').Router();
const db = require('./users-model');

router.get('/', async (req, res) => {
  try{
    const users = await db.find()
    res.json(users)
  }catch{

  }
})





module.exports = router;