import { Router } from 'express'
import PartnerController from './controllers/PartnerController'

const routes = Router()

routes.get('/partners', PartnerController.index)
routes.get('/partners/:id', PartnerController.index)
routes.post('/partners', PartnerController.store)

export default routes

