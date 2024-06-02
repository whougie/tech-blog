const router = require('express').Router();
const bcrypt= require('bcrypt');

const { User, Post, Comment } = require('../../models');

// The `/api/users` endpoint

router.get('/', async (req, res) => {
  // find all
  try {
    const result = await User.findAll({});
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  // find one by its `id` value
  try {
    const result = await User.findByPk(req.params.id);
    res.status(200).json(result);
  } catch(error){
    console.log(error);
    res.status(400).json( {status: "error", message: error.message} );
  }
});

router.post('/', async (req, res) => {
  // create a new one
  try {
    const result = await User.create(req.body);
    
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = result.id;
      req.session.userName = result.username;
      res.json({ status: "success", payload: result });
    });
  } catch(error){
    console.log(error);
    res.status(400).json( {status: "error", message: error.message} );
  }
});

router.put('/:id', async (req, res) => {
  // update a one by its `id` value
  try {
    const result = User.update(req.body, { where: { id: req.params.id }, individualHooks: true});
    res.json({ status: "success", payload: result });
  } catch(error){
    console.log(error);
    res.status(400).json( {status: "error", message: error.message} );
  }
});

router.delete('/:id', async (req, res) => {
  // delete a one by its `id` value
  try {
    const result = await User.destroy({ where: { id: req.params.id } } );
    res.json({status: "Deleted", payload: result});
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} );
  }
});

router.post("/login", async (req, res) => {
  let userNameCheck
  
  try {
    userNameCheck = await User.findOne({
      where: {
        username: req.body.username
      }
    })
  } catch(error){
    console.log(error)
    res.status(400).json({ status: "error", message: "Username or Password inputted is incorrect" })
  }
  
  if( !userNameCheck ){
    return res.status(401).json({ status: "error", message: "Username or Password does not match" })
  }
  
  // if we are this far, then the usename matched
  const hashedPassword = userNameCheck.password
  
  // time to verify the hashed password 
  const verified = await bcrypt.compare(req.body.password, hashedPassword)
  
  if( verified ) {
    const user = userNameCheck.get({plain:true});

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = user.id;
      req.session.userName = user.username;
      res.json({ status: "success", payload: user });
    })
  } else {
    res.status(401).json({ status: "error", message: "User is unauthenticated" });
  }
});


router.post("/logout", (req, res) => {
  req.session.destroy(() => res.status(204).end())
});


module.exports = router;
