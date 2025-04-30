import Supplier from './supplier.model.js';

export const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();

        if (suppliers.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No suppliers found'
            })
        }

        return res.send({
            success: true,
            message: 'Suppliers found',
            total: suppliers.length,
            suppliers
        })
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const getSupplierByID = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).send({
                success: false,
                message: 'Supplier not found'
            })
        }

        return res.send({
            success: true,
            message: 'Supplier found',
            supplier
        });
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const createSupplier = async (req, res) => {
    try {
        const data = req.body
        const supplier = new Supplier(data);
        await supplier.save()

        return res.send({
            success: true,
            message: 'Supplier created successfully',
            supplier
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updated = await Supplier.findByIdAndUpdate(id, data, { new: true })

        if (!updated) {
            return res.status(404).send({
                success: false,
                message: 'Supplier not found'
            })
        }

        return res.send({
            success: true,
            message: 'Supplier updated successfully',
            updated
        })
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await Supplier.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).send({
                success: false,
                message: 'Supplier not found'
            })
        }

        return res.send({
            success: true,
            message: 'Supplier deleted successfully'
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
