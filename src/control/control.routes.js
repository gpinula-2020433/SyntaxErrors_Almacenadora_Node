import { Router } from 'express';
import {
    addControl,
    getAllControl,
    getControltById,
    getControlByType,
    updateControl,
    deleteControl
} from './control.controller.js'

const api = Router()

api.post('/add', addControl)
api.get('/getAll', getAllControl)
api.get('/byId/:id', getControltById)
api.get('/type/:type', getControlByType);
api.put('/update/:id', updateControl)
api.delete('/delete/:id', deleteControl)

export default api