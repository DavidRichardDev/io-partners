const partner = await Partner.find({ 
    coverageArea : { 
        $geoIntersects : {
            $geometry: {
                type: "Point", coordinates:[long, lat]
            }
        }
    }, 
    address :{
            $near: {
                $geometry: {
                   distanceField: "dist.calculated",
                   type: "Point", coordinates: [ long, lat ]
                }
            }
    }
});



3
3296584.3741650917

929
3296621.404729948