import { Router } from "express"
import {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} from "./client.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const router = Router()

router.get('/', getAllClients)
router.get('/:id', getClientById)
router.post('/add', createClient)
router.put('/:id', updateClient)
router.delete('/:id', deleteClient)

export default router;
