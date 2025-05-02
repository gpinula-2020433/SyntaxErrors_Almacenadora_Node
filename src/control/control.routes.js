import { Router } from 'express';
import {
    addControl,
    getAllControl,
    getControltById,
    getControlByType,
    updateControl,
    deleteControl
} from './control.controller.js'
import { validateErrors } from '../../middlewares/validate.errors.js';

const api = Router()

api.post('/add', [validateErrors], addControl)
api.get('/getAll', getAllControl)
api.get('/:id', getControltById)
api.get('/type/:type', getControlByType)
api.put('/update/:id', updateControl)
api.delete('/delete/:id', deleteControl)

export default api