const express = require('express');
const router = express.Router({mergeParams: true});
const Charger = require('../models').Chargers;
const Reservation = require('../models').Reservations


router.get('/',async (req,res)=>{
    let user_chargers = await Charger.findAll({
        raw:true,
        where: {email:req.params.email}
    }) 
    
    for (let i = 0; i<user_chargers.length;i++){
        let available_time =[]
        let reservationKey = user_chargers[i].reservation_key
        for(inspectTime=0;inspectTime<=23;inspectTime++){
            let availableInspect = await Reservation.findOne({
                raw:true,
                attributes: ['time_'+inspectTime.toString()],
                where: {reservation_key: `${reservationKey}`}
            });
            console.log(availableInspect)
            availableInspect = availableInspect['time_'+inspectTime.toString()];
            if(availableInspect==0){
                available_time.push(inspectTime);
            }
        }
        if(available_time.length!==0){
            user_chargers[i].available = available_time
        }
    } // 시간 추가
    
    res.send(user_chargers)
    }
)

module.exports = router;