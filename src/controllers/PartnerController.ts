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
        // const { lat, long } = request.params;

        // console.log(`lat:${lat} long:${long}`);

        // const partner = await Partner.find({ coordinates : { $near : {$geometry: {type: "MultiPolygon", coordinates:[-46.57421, -52.56489]}} }})

        const partner = await Partner.find({ coordinates : { $nearSphere : [-46.57421, -52.56489]}})

        return response.status(200).json(partner);
        
        // try {
        //     if(lat && long){
        //         const partner = await Partner.find({ coordinates : { $near : {$geometry: {type: "MultiPolygon", coordinates:[-46.57421, -52.56489]}} }})
        //         // const partner = await Partner.find({ coordinates : { $near : [long, lat]} })

        //         console.log(partner)
        
        //         return response.status(200).json(partner);
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