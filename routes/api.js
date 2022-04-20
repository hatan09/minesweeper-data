const express = require('express');
const router = express.Router();
const MongoObject = require('../mongodb');
const uuid = require('uuid');

//get all users
router.get('/getall', (req, res) => {
    MongoObject.getAllUsers((data) => {
        res.json(data);
    })
});

//get user with id
router.get('/getbyid/:id', (req, res) => {
    res.send(req.params.id); 

    MongoObject.getAllUsers((data) => {
        res.json(data);
    })
});

//create user
router.post('/create', (req, res) =>{
    console.log(req.body);
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        username: req.body.username,
        pass: req.body.pass,
        highest_score: 0,
    }

    if(!newUser.name || !newUser.username || !newUser.pass){
        res.status(400).json({msg: 'Please provide adequate info!'});
        return;
    }

    MongoObject.addUser(newUser);
    res.json({msg: 'OK'})
});

// update user
router.post('/update', (req, res) =>{
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        username: req.body.username,
        pass: req.body.pass,
        highest_score: 0,
    }

    if(!newUser.name || !newUser.username || !newUser.pass){
        res.status(400).json({msg: 'Please provide adequate info!'});
        return;
    }

    MongoObject.addAUser(newUser);
    res.json({msg: newUser.id});
});

// delete user
router.post('/delete', (req, res) =>{
    
    res.json({msg: 'OK'})
});


module.exports = router;
