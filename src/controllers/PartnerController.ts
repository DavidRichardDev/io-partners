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
}

export default new PartnerController()