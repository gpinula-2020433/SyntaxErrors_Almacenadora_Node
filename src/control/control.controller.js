import Control from './control.model.js'
import Product from '../product/product.model.js'

//Agregar control
export const addControl = async (req, res) => {
    try {
        const data = {
            ...req.body,
            quantity: Number(req.body.quantity) // 🔧 fuerza a número
        };

        if (isNaN(data.quantity)) {
            return res.status(400).send({
                success: false,
                message: 'Quantity must be a valid number'
            });
        }

        if (data.type === 'EXIT' && (!data.reason || !data.destination)) {
            return res.status(400).send({
                success: false,
                message: 'Reason and destination are required for EXIT type'
            });
        }

        const product = await Product.findById(data.product);

        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }

        if (data.type === 'ENTRANCE') {
            product.stock += data.quantity;
        } else if (data.type === 'EXIT') {
            if (product.stock === 0) {
                return res.status(400).send({
                    success: false,
                    message: 'It is not possible to perform the EXIT because there is no stock available.'
                });
            }

            if (product.stock < data.quantity) {
                return res.status(400).send({
                    success: false,
                    message: `Insufficient stock, Current stock is ${product.stock}`
                });
            }

            product.stock -= data.quantity;
            product.soldCount += data.quantity;
        }

        await product.save();

        const control = new Control(data);
        await control.save();

        return res.send({
            success: true,
            message: 'Control created successfully and stock updated',
            control,
            newStock: product.stock
        });

    } catch (err) {
        console.error('Error creating control', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};


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

        if (!['entrance', 'exit'].includes(type)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid type, Use "entrance" or "exit".'
            })
        }

        const controls = await Control.find({ type: type.toUpperCase() }).sort({ date: -1 })

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

//Actualizar control con manejo del stock y soldCount
export const updateControl = async (req, res) => {
    try {
        const { id } = req.params
        const newData = {
            ...req.body,
            quantity: Number(req.body.quantity)
        }

        if (isNaN(newData.quantity)) {
            return res.status(400).send({
                success: false,
                message: 'Quantity must be a valid number'
            })
        }

        const existingControl = await Control.findById(id)
        if (!existingControl) {
            return res.status(404).send({
                success: false,
                message: 'Control not found'
            })
        }

        const oldProduct = await Product.findById(existingControl.product)
        if (!oldProduct) {
            return res.status(404).send({
                success: false,
                message: 'Original product not found'
            })
        }

        const oldQuantity = Number(existingControl.quantity)

        if (existingControl.type === 'ENTRANCE') {
            oldProduct.stock -= oldQuantity
        } else if (existingControl.type === 'EXIT') {
            oldProduct.stock += oldQuantity
            oldProduct.soldCount -= oldQuantity
        }

        await oldProduct.save()

        const newProduct = await Product.findById(newData.product)
        if (!newProduct) {
            return res.status(404).send({
                success: false,
                message: 'New product not found'
            })
        }

        if (newData.type === 'EXIT') {
            if (!newData.reason || !newData.destination) {
                return res.status(400).send({
                    success: false,
                    message: 'Reason and destination are required for EXIT type'
                })
            }

            if (newProduct.stock < newData.quantity) {
                return res.status(400).send({
                    success: false,
                    message: `Insufficient stock, current stock is ${newProduct.stock}`
                })
            }

            newProduct.stock -= newData.quantity
            newProduct.soldCount += newData.quantity
        } else if (newData.type === 'ENTRANCE') {
            newProduct.stock += newData.quantity
        }

        await newProduct.save()

        const updatedControl = await Control.findByIdAndUpdate(
            id,
            newData,
            { new: true }
        )

        return res.send({
            success: true,
            message: 'Control updated successfully and stock adjusted',
            control: updatedControl,
            newStock: newProduct.stock,
            newSoldCount: newProduct.soldCount
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

// Eliminar Control y ajustar stock y soldCount
export const deleteControl = async (req, res) => {
    try {
        const { id } = req.params;
        const control = await Control.findById(id)

        if (!control) {
            return res.status(404).send({
                success: false,
                message: 'Control not found'
            })
        }

        const product = await Product.findById(control.product)

        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }

        // Ajustar el stock y soldCount según el tipo de control
        if (control.type === 'ENTRANCE') {
            product.stock -= control.quantity// Revertir el stock por la entrada
        } else if (control.type === 'EXIT') {
            product.stock += control.quantity // Revertir el stock por la salida
            product.soldCount -= control.quantity // Revertir el soldCount por la salida
        }

        // Guardar el producto actualizado
        await product.save()

        // Eliminar el control de la base de datos
        await Control.findByIdAndDelete(id)

        return res.send({
            success: true,
            message: 'Control deleted successfully and stock adjusted',
            product,
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