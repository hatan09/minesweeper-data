const express = require('express');
const router = express.Router();
const MongoObject = require('../mongodb');
const uuid = require('uuid');

// get all users
router.get('/getall', (req, res) => {
    MongoObject.getAllUsers((data) => {
        res.json(data);
    })
});

// get user with id
// url/api/getbyid/123
router.get('/getbyid/:id', (req, res) => {
    MongoObject.findById(req.params.id, (data) =>{
        res.json(data);
    });
});

// login
router.get('/login/:username', (req, res) => {
    let username = req.params.username;

    MongoObject.findByUsername(username, (data) =>{
        res.json(data);
    });
});

//create user
router.post('/create', (req, res) =>{
    //console.log(req.body);
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        username: req.body.username,
        highest_score: 0,
    }

    if(!newUser.name || !newUser.username){
        res.status(400).json({msg: 'Please provide adequate info!'});
        return;
    }

    MongoObject.addUser(newUser, (data) => {
        res.json(data);
    });
    
});

// update user
router.post('/update/:id/:field&:value', (req, res) =>{
    let id = req.params.id;
    let fields = req.params.field.split(",");
    let values = req.params.value.split(",");
    let obj = {}

    fields.map((data, i) => {
        obj[data] = values[i];
    })

    MongoObject.updateUser(id, obj, (data) =>{
        res.json(data);
    });
});

// delete user
router.post('/delete', (req, res) =>{
    
    res.json({msg: 'OK'})
});


module.exports = router;
