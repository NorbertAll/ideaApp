const express= require('express');
const router =express.Router();
const {Likes}= require("../models");
const { validateToken }=require('../middlewares/AuthMiddleware')

router.post("/", validateToken, async(req, res)=>{
    const {IdeaId} =req.body;
    const UserId = req.user.id;

    const found= await Likes.findOne({ where: { IdeaId: IdeaId, UserId:UserId}})
    if(!found){
       await Likes.create({IdeaId: IdeaId, UserId: UserId}) 
       res.json({liked: true})
    }else{
        await Likes.destroy({ where: { IdeaId: IdeaId, UserId:UserId}});
        res.json({liked: false})
    }

})

module.exports = router;