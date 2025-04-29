import { Router } from 'express'
import {
    getAllSuppliers,
    getSupplierByID,
    createSupplier,
    updateSupplier,
    deleteSupplier
} from './supplier.controller.js'

const router = Router()

router.get('/', getAllSuppliers)

router.get('/:id', getSupplierByID)

router.post('/', createSupplier)

router.put('/:id', updateSupplier)

router.delete('/:id', deleteSupplier)

export default router;
