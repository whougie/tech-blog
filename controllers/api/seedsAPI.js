const router = require('express').Router();
const seeds = require("../../seeds")

router.post("/", ( req , res ) => {
  seeds();
  res.json({status: "ok", msg: "Seeding is complete"})
} )

module.exports = router;
