const express= require('express');
const router =express.Router();
const {Comments}= require("../models");




router.get('/:ideaId', async(req, res)=>{
    const postId= req.params.id
    const comments =await Comments.findAll({where: {IdeaId: postId}});
    res.json(comments)

});

//router.post();
router.post('/', async (req, res)=>{
    const comment =req.body;
    await Comments.create(comment);
    res.json(comment);
});


module.exports = router;