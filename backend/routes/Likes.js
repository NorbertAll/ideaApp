const express= require('express');
const router =express.Router();
const {Likes}= require("../models");
const { validateToken }=require('../middlewares/AuthMiddleware')

router.post("/", validateToken, async(req, res)=>{
    const {IdeaId} =req.body;
    const UserId = req.user.id;
    Likes.create({IdeaId: IdeaId, UserId: UserId})
    res.json("Succes like")
})

module.exports = router;