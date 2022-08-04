const express= require('express');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router =express.Router();
const {Comments}= require("../models");




router.get('/:ideaId', async(req, res)=>{
    const ideaId= req.params.ideaId;
    const comments =await Comments.findAll({where: {IdeaId: ideaId}});
    res.json(comments)

});

//router.post();
router.post('/', validateToken, async (req, res)=>{
    const comment =req.body;
    const username= req.user.username;
    comment.username=username;
    await Comments.create(comment);
    res.json(comment);
});


module.exports = router;