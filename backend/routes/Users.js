const express= require('express');
const router =express.Router();
const {Users}= require("../models");
const bcrypt= require('bcrypt')

const {sign}= require('jsonwebtoken')

//router.post();
router.post('/',async (req, res)=>{
    const {username, password} =req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        })
        res.json("Success");
    });
});
router.post('/login',async (req, res)=>{
    const {username, password} =req.body;
    const user= await Users.findOne({where: {username:username}});
    if(!user){
        res.json({error: "User Doesn't exist"});}
    else{
    console.log(user);
    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) res.json({error: "Wrong username or password"});
        const accessToken = sign({username: user.username, id:user.id}, "importantsecret")
        res.json(accessToken)
    })}
});


module.exports = router;
