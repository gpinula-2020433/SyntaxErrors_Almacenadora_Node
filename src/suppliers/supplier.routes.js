import { Router } from 'express';
import {
    getAllSuppliers,
    getSupplierByID,
    createSupplier,
    updateSupplier,
    deleteSupplier
} from './supplier.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';

const router = Router();

router.get('/', [validateJwt], getAllSuppliers);
router.get('/:id', [validateJwt], getSupplierByID);
router.post('/add', [validateJwt], createSupplier);
router.put('/:id', [validateJwt], updateSupplier);
router.delete('/:id', [validateJwt], deleteSupplier);

export default router;

