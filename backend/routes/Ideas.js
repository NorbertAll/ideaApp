const express= require('express');
const router =express.Router();
const {Ideas, Likes}= require("../models");
const { validateToken }=require('../middlewares/AuthMiddleware')



router.get('/', validateToken, async (req, res)=>{
    const listOfIdeas= await Ideas.findAll({include: [Likes]});
    
    const likedIdea= await Likes.findAll({where: {UserId: req.user.id}});
    res.json({listOfIdeas:listOfIdeas, likedIdea:likedIdea});
});


router.get('/byId/:id', async(req, res)=>{
    const id= req.params.id
    const idea =await Ideas.findByPk(id)
    res.json(idea)

});
router.get('/byuserId/:id', async(req, res)=>{
    const userId= req.params.id
    const ideas= await Ideas.findAll({where: {UserId: userId}});
    res.json(ideas)

});
//router.post();
router.post('/', validateToken, async (req, res)=>{
    const idea =req.body;
    idea.username = req.user.username;
    idea.UserId = req.user.id;
    console.log(idea);
    await Ideas.create(idea);
    res.json(idea);
});
router.delete("/:ideaId", validateToken, async (req, res)=>{
    const ideaId =req.params.ideaId
    await Ideas.destroy({where:{id:ideaId}})
    res.json("delete success");
})

module.exports = router;
