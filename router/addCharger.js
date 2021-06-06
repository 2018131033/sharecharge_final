const express = require('express');
const router = express.Router({mergeParams: true});
const Users = require('../models').Users;
const Chargers = require("../models").Chargers
const Reservations = require("../models").Reservations;


router.get('/',async (req,res,next)=>{
    try{    
        
        let starting_time = req.params.starting_time;
        let ending_time = req.params.ending_time;
        let reservation_key=0;

        await Chargers.create({
            price_per_hour: req.params.price_per_hour,
            x: req.params.x,
            y: req.params.y,
            address_name: req.params.region_1depth_name+" "+req.params.region_2depth_name+" "+req.params.region_3depth_name,
            region_1depth_name: req.params.region_1depth_name,
            region_2depth_name: req.params.region_2depth_name,
            region_3depth_name: req.params.region_3depth_name,
            image_src: req.params.image_src,
            email: req.params.email,
            owner_name: req.params.owner_name
        }).then(
            function(){
                Reservations.create({
                })
            }
        ).then(
            function(){
                reservation_key = Reservations.count().then(c=>{
                    console.log(c);
                    reservation_key = c+1;
                    console.log(reservation_key);
                });
            }
        ).then(
            function(){
                reservation_key.then(result=>{
                    for(inspectTime=starting_time;inspectTime<=ending_time;inspectTime++){
                        let whichtime = 'time_'+inspectTime.toString();
                        let updateData= {};
                        updateData[`${whichtime}`] = 0;
                        
                        Reservations.update(
                            updateData,
                            {where: {reservation_key: `${result}`}}
                        )
                    }
                });
            }
        ).then(
            reservation_key.then(function(result){
                Chargers.update(
                    {reservation_key: `${result}`},
                    {where: {x: req.params.x}}
                )
            })
        )
        
        res.send("done");
        
    }
    catch(err){
        console.log('not good')
        console.error(err)
        //next(err)
    }
})


module.exports = router;