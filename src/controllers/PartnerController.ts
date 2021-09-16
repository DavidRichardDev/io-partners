import { Request, Response } from 'express'
import Partner from '../schemas/Partner'
import { v4 as uuidv4 } from 'uuid'

class PartnerController {
    public async index (request: Request, response: Response): Promise <Response> {
        const { id } = request.params;
        
        try {
            const partners = (id) ? await Partner.findOne({id}) : await Partner.find();
        
            return response.status(200).json(partners)
        } catch (err) {
            return response.status(400).json({
              message: err.message || 'Unexpected error.'
            })
        }
    }

    public async store (request: Request, response: Response): Promise <Response> {
        
        try {
            request.body.id = uuidv4()
            const partner = await Partner.create(request.body)
        
            return response.status(200).json(partner)
        } catch (err) {
            return response.status(400).json({
              message: err.message || 'Unexpected error.'
            })
        }
    }

    public async find (request: Request, response: Response): Promise <Response> {
        const lat = request.query.lat;
        const long = request.query.long;
        let latNumber = [parseFloat(long), parseFloat(lat)];
        const partner = await Partner.aggregate([{ 
                                            
                                                $geoNear: {
                                                    key: 'address',
                                                    query:{
                                                        'coverageArea' : { 
                                                            '$geoIntersects' : {
                                                                '$geometry': {
                                                                    'type': "Point", 'coordinates': latNumber
                                                                }
                                                            }
                                                        }
                                                    },
                                                    distanceField: 'calc',
                                                    includeLocs: 'dist.locs',
                                                    spherical: true,                                                  
                                                    near: {
                                                        type: "Point", coordinates: latNumber
                                                    }
                                                } 
                                        }]).sort('-calc');

        console.log(`lat${lat} long${long}`)
        // console.log(partner)

        return response.status(200).json(partner);

        
        // const partner = await Partner.find({ coordinates : { $nearSphere : [-46.57421, -52.56489]}})
        
        // try {
        //     if(lat && long){
                
        //         const location =  {type: 'Point', coordinates: [lat, long] }


        //         // const nearPartner = await Partner.findOne(location).where('address');
        //         // const partnerCoverageAreaCheck = (nearPartner) ? await Partner.findOne(location).where('coverageArea').within('') : [];

        //         return (partnerCoverageAreaCheck) ? response.status(200).json(partnerCoverageAreaCheck) : response.status(400).json({message: `Partner not found for Latitude:${lat} Longitude:${long}`})
        //     }else{
        //         return response.status(400).json({
        //             message: "Is needed latitude and longitude fields"
        //         })
        //     }
            
        // } catch (err) {
        //     return response.status(400).json({
        //       message: err.message || 'Unexpected error.'
        //     })
        // }
    }
}

export default new PartnerController()