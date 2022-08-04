const express= require('express');
const router =express.Router();
const {Ideas}= require("../models");
const { validateToken }=require('../middlewares/AuthMiddleware')

router.get('/', async (req, res)=>{
    const listOfIdeas= await Ideas.findAll();
    res.json(listOfIdeas);
});


router.get('/byId/:id', async(req, res)=>{
    const id= req.params.id
    const idea =await Ideas.findByPk(id)
    res.json(idea)

});

//router.post();
router.post('/', validateToken, async (req, res)=>{
    const idea =req.body;
    await Ideas.create(idea);
    res.json(idea);
});


module.exports = router;
