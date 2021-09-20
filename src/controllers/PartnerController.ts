import { Request, Response } from 'express'
import Partner from '../schemas/Partner'
import { v4 as uuidv4 } from 'uuid'
import { isArray } from 'util';

class PartnerController {
	public async index(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		try {
			const partners = id ? await Partner.findOne({ id }) : await Partner.find()

			if (!partners) {
				return response.status(400).json({ message: 'Partner not found.' })
			}
			if (Array.isArray(partners) && !partners.length) {
				return response.status(400).json({ message: 'No partner registered.' })
			}
			return response.status(200).json(partners)
		} catch (err) {
			return response.status(400).json({
				message: err.message || 'Unexpected error.'
			})
		}
	}

	public async store(request: Request, response: Response): Promise<Response> {
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

	public async nearest(request: Request, response: Response): Promise<Response> {
		const { lat, long } = request.query

		try {
			if (lat && long) {
				const coordinates = [Number(long), Number(lat)]

				const partner = await Partner.aggregate([
					{
						$geoNear: {
							key: 'address',
							query: {
								coverageArea: {
									$geoIntersects: {
										$geometry: {
											type: 'Point',
											coordinates: coordinates
										}
									}
								}
							},
							distanceField: 'calc',
							includeLocs: 'dist.locs',
							spherical: true,
							near: {
								type: 'Point',
								coordinates: coordinates
							}
						}
					}
				]).sort('-calc')

				return partner.length
					? response.status(200).json(partner[0])
					: response.status(400).json({
						message: `Partner not found for coordinates Lat:${lat} and Long:${long}`
					})
			} else {
				return response.status(400).json({
					message:
						'Latitude and longitude fields are required to find a nearest partner'
				})
			}
		} catch (err) {
			return response.status(400).json({
				message: err.message || 'Unexpected error.'
			})
		}

	}
}

export default new PartnerController()