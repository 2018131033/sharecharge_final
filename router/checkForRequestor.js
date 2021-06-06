const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models').Users;
const Chargers = require("../models").Chargers
const Reservations = require("../models").Reservations;

router.get('/',async (req,res)=>{
    // information from req
    let userEmail = req.params.email;
    let chargerKey = req.params.charger_key;

    let starting_time=0;
    let ending_time=0;

    // information about people
    let userKey = await User.findOne({
        raw:true,
        attributes: ['user_key'],
        where: {email: `${userEmail}`}
    });
    let ownerEmail = await Chargers.findOne({
        raw: true,
        attributes: ['email'],
        where: {charger_key: `${chargerKey}`}
    });
    let reservationKey = await Chargers.findOne({
        raw: true,
        attributes: ['reservation_key'],
        where: {charger_key: `${chargerKey}`}
    });

    let firstTimetoFindMyself= false;
    for(inspectTime=0;inspectTime<=23;inspectTime++){
        let availableInspect = await Reservations.findOne({
            raw:true,
            attributes: ['time_'+inspectTime.toString()],
            where: {reservation_key: `${reservationKey}`}
        });
        if(!firstTimetoFindMyself && availableInspect===userKey){
            firstTimetoFindMyself=true;
            starting_time=inspectTime;
        }
        else if(firstTimetoFindMyself && availableInspect!==userKey){
            ending_time=inspectTime-1;
            break;
        }
    }
    if(firstTimetoFindMyself){
        res.json({"starting_time":starting_time, "ending_time":ending_time, "email":ownerEmail});
    }
    else{
        res.send("Reservation not completed.");
    }
    
})

module.exports = router;