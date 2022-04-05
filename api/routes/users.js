const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport")

const isLogged = (req, res, next) => {
    if (!req.user) res.sendStatus(401);
    else next();
  };

  const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) res.sendStatus(401);
    else next();
  };

  router.get('/admin', isLogged, isAdmin, (req, res, next) => {
    User.findAll()
      .then(users => res.send(users))
      .catch(next);
  });


router.post("/register", (req, res, next)=>{
    User.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(next);
});

router.post("/login",passport.authenticate('local'),(req,res)=>{
    
     res.send(req.user);
});

router.post("/logout",(req,res)=>{
    req.logOut()
    res.sendStatus(200)  
});

  router.put("/update", (req, res, next)=>{
    const { name, email, password } = req.body

    const datosActualizados = { name, email, password  }
     User.findByIdAndUpdate({_id: req.user.id},
        { $set: datosActualizados }, 
        { new: false }) 
        .then(user => res.status(200).send(user))
        .then(()=>console.log("Datos actualizados"))  
    .catch(next); 
});  

router.get("/me", (req, res) => {
    if(!req.user){
        return res.sendStatus(401)
    }
    res.send(req.user);
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => res.send(user))
  });

  router.put('/admin/:id', isLogged, isAdmin, (req, res, next) => {
    
    const { name, email, password } = req.body

    const datosActualizados = { name, email, password  }

    User.findByIdAndUpdate({_id: req.params.id},
        { $set: datosActualizados }, 
        { new: false }) 
        .then(user => res.status(200).send(user))
        .then(()=>console.log("Datos actualizados"))  
    .catch(next); 
  });

  /* router.get('/history/:id', (req, res, next)=>{
    User.findById(req.params.id)
      .then(user => user.getOrders())
      .then(orders =>{
        return orders.map(order => {
          return order.products.map(product => JSON.parse(product))
        })
      })
      .then(products => {res.send(products)})
      .catch(next)
  }) */



module.exports = router;
    