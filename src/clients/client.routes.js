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

router.get('/', [validateJwt], getAllClients)
router.get('/:id', [validateJwt], getClientById)
router.post('/add', [validateJwt], createClient)
router.put('/:id', [validateJwt], updateClient)
router.delete('/:id', [validateJwt], deleteClient)

export default router;
