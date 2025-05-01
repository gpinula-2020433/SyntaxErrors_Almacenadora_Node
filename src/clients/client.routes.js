import { Router } from "express"
import {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} from "./client.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import {
    registerClientValidator,
    updateClientValidator
} from "../../middlewares/validators.js"

const router = Router()

router.get('/', [validateJwt], getAllClients)
router.get('/:id', [validateJwt], getClientById)
router.post('/add', [validateJwt, registerClientValidator], createClient)
router.put('/:id', [validateJwt, updateClientValidator], updateClient)
router.delete('/:id', [validateJwt], deleteClient)

export default router;
