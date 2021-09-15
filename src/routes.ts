import { Router } from 'express'
import PartnerController from './controllers/PartnerController'

const routes = Router()

routes.get('/partners', PartnerController.index)
routes.get('/partner/:id', PartnerController.index)
routes.get('/find', PartnerController.find)
routes.post('/partners', PartnerController.store)

export default routes

