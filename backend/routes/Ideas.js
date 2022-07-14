const express= require('express');
const router =express.Router();
const {Ideas}= require("../models");

router.get('/', async (req, res)=>{
    const listOfIdeas= await Ideas.findAll();
    res.json(listOfIdeas);
});

//router.post();
router.post('/',async (req, res)=>{
    const idea =req.body;
    await Ideas.create(idea);
    res.json(idea);
});


module.exports = router;
