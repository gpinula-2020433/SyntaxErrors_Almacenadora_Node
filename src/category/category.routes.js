import { Router } from 'express';
import { 
    save,
    getAllC,
    getCategory,
    updateCategory,
    deleteCategory
} from './category.controller.js';
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js';

const api = Router();

api.get('/', [validateJwt], getAllC)
api.post('/', [validateJwt], save)
api.get('/:id', [validateJwt], getCategory)
api.put('/:id', [validateJwt] , updateCategory)
api.delete('/:id', [validateJwt] , deleteCategory)


export default api