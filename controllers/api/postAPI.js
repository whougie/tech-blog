const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// The `/api/posts` endpoint

router.get('/', async (req, res) => {
  // find all
  try {
    const result = await Post.findAll({
      include: [{ model: User}]
    })
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  // find one by its `id` value
  try {
    const result = await Post.findByPk(req.params.id, {include: [{ model: User}]} )
    res.status(200).json(result);
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.post('/', async (req, res) => {
  // create a new one
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  try {
    req.body.user_id = req.session.userId;
    const result = await Post.create(req.body);
    console.log("This is result from the server side-----------------")
    console.log(result)
    res.json({ status: "success", payload: result })
  } catch(error){
    console.log(error)
    console.log("This is result from the server side for the error-----------------")
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.put('/:id', async (req, res) => {
  // update one by its `id` value
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  try {
    const result = Post.update(req.body, { where: { id: req.params.id }, individualHooks: true});
    res.json({ status: "success", payload: result });
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.delete('/:id', async (req, res) => {
  // delete a one by its `id` value
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  try {
    const result = await Post.destroy({ where: { id: req.params.id } } );
    res.json({status: "Deleted", payload: result});
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

module.exports = router;
