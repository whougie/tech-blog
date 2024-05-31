const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const date = require('date-and-time');

// The `/api/comments` endpoint

router.get('/', async (req, res) => {
  // find all
  try {
    const result = await Comment.findAll({
      include: [{ model: Post}, { model: User}]
    })
    let formattedResult = result;

    if (result) {
      formattedResult = result.map(comment => {
        let result = comment.get({ plain: true }) ;
        result.createdAt = date.format(comment.createdAt,'MM/DD/YYYY'); //Convert the date to look nice
        return result;
      })
    }    
    res.json({ status: "success", payload: formattedResult });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  // find one by its `id` value
  try {
    let result = await Comment.findByPk(req.params.id, {include: [{ model: Post}, { model: User}]} )
    if (result) {
      result = result.get({ plain: true }) ;
      result.createdAt = date.format(result.createdAt,'MM/DD/YYYY'); //Convert the date to 
    }
    console.log(result)
    res.status(200).json(result);
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.post('/', async (req, res) => {
  // create a new one
  try {
    req.body.user_id = req.session.userId;
    const result = await Comment.create(req.body);
    res.json({ status: "success", payload: result })
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.put('/:id', async (req, res) => {
  // update one by its `id` value
  try {
    const result = Comment.update(req.body, { where: { id: req.params.id }, individualHooks: true});
    res.json({ status: "success", payload: result });
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.delete('/:id', async (req, res) => {
  // delete a one by its `id` value
  try {
    const result = await Comment.destroy({ where: { id: req.params.id } } );
    res.json({status: "Deleted", payload: result});
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

module.exports = router;
