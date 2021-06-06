const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models').Users;



router.get('/',async (req,res,next)=>{
    try{
        let responseData;
        console.log(req.query.email)
        let user = await User.findOne({raw:true,
             where:{email: req.query.email}
         })
             .then(function(user){
                 if(user==null || user.sns_token!=req.query.token){
                     responseData = {'result':'no'};
                     res.json(responseData);
                     console.log('로그인 실패');
                 } 
                 else{
                     res.json(user);
                     console.log('로그인 성공');
                 }
             });
    }catch(err){
        console.error(err)
        res.send(err)
    }
})

module.exports = router;
