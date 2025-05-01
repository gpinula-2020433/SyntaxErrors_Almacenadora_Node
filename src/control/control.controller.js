import Control from './control.model.js'

//Agregar control
export const addControl = async (req, res) => {
    try {
        const data = req.body

        if (data.type === 'output' && (!data.reason || !data.destiny)) {
            return res.status(400).send({
                success: false,
                message: 'Reason and destination are required for output type'
            })
        }

        const control = new Control(data)
        await control.save()

        return res.send({
            success: true,
            message: 'Control created successfully',
            control
        })
    } catch (err) {
        console.error('Error creating control', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

//Listar todos los controles
export const getAllControl = async (req, res) => {
    try {
        const controls = await Control.find().sort({ date: -1 })

        if (controls.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No control found'
            })
        }

        return res.send({
            success: true,
            message: 'Control found',
            total: controls.length,
            controls
        })
    } catch (err) {
        console.error('Error fetching controls', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

//Listar control por ID
export const getControltById = async (req, res) => {
    try {
        const { id } = req.params
        const control = await Control.findById(id)

        if (!control) {
            return res.status(404).send({
                success: false,
                message: 'Control not found'
            })
        }

        return res.send({
            success: true,
            message: 'Control found',
            control
        })
    } catch (err) {
        console.error('Error fetching control', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

//Listar por entrada/salida
export const getControlByType = async (req, res) => {
    try {
        const { type } = req.params

        if (!['input', 'output'].includes(type)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid type. Use "input" or "output".'
            })
        }

        const controls = await Control.find({ type }).sort({ date: -1 })

        if (controls.length === 0) {
            return res.status(404).send({
                success: false,
                message: `No ${type} controls found`
            })
        }

        return res.send({
            success: true,
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} controls found`,
            total: controls.length,
            controls
        })
    } catch (err) {
        console.error('Error filtering controls by type', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

//Actualizar control
export const updateControl = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updated = await Control.findByIdAndUpdate(id, data, { new: true })

        if (!updated) {
            return res.status(404).send({
                success: false,
                message: 'Control not found'
            })
        }

        return res.send({
            success: true,
            message: 'Control updated successfully',
            updated
        })
    } catch (err) {
        console.error('Error updating control', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

//Eliminar Control
export const deleteControl = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Control.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).send({
                success: false,
                message: 'Control not found'
            })
        }

        return res.send({
            success: true,
            message: 'Control deleted successfully'
        })
    } catch (err) {
        console.error('Error deleting control', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}