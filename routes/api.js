const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// Get a list of objects from the db
router.get('/ninjas',function(req,res){
  // Ninja.find({}).then(function(ninjas){
  //   res.send(ninjas);
  // });
  Ninja.geoNear(
    {type: 'Point',coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    {maxDistance: 1000000,spherical: true} // 1000000 metres
  ).then(function(ninjas){
    res.send(ninjas);
  });
});

// Add a ninja to the db
router.post('/ninjas',function(req,res,next){
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja);
  }).catch(next); // for next middleware if error

});

// Update a ninja in the db
router.put('/ninjas/:id',function(req,res){
  Ninja.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
    Ninja.findOne({_id: req.params.id}).then(function(ninja){
      res.send(ninja);
    });

  });
});

// Delete a ninja from the db
router.delete('/ninjas/:id',function(req,res){
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});


module.exports = router;
