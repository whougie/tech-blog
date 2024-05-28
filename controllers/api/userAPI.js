const router = require('express').Router();

const { User } = require('../../models');

// The `/api/users` endpoint

router.get('/', async (req, res) => {
  // find all
  try {
    const result = await User.findAll({
    })
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  // find one by its `id` value
  try {
    const result = await User.findByPk(req.params.id)
    res.status(200).json(result);
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.post('/', async (req, res) => {
  // create a new one
  try {
    const result = await User.create(req.body);
    res.json({ status: "success", payload: result })
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.put('/:id', async (req, res) => {
  // update a one by its `id` value
  try {
    const result = User.update(req.body, { where: { id: req.params.id }, individualHooks: true});
    res.json({ status: "success", payload: result });
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.delete('/:id', async (req, res) => {
  // delete a one by its `id` value
  try {
    const result = await User.destroy({ where: { id: req.params.id } } );
    res.json({status: "Deleted", payload: result});
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

module.exports = router;
