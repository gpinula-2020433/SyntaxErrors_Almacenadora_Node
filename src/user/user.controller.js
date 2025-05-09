'use strict'

import User from '../user/user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../../utils/encrypt.js'

export const test = async (req, res) => {
    return res.send('The user route is running')
}


export const getAll = async(req,res)=>{
    try{
        //Configuraciones de paginación
        const { limit = 20, skip = 0} = req.query
        //Consultar
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found',
                users
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error',e})
    }
}

export const defaultAdmin = async (nameA, surnameA, usernameA, emailA, passwordA, phoneA, roleA) => {
    try {
        let adminFound = await User.findOne({ role: 'ADMIN' })
        if (!adminFound) {
            const data = {
                name: nameA,
                surname: surnameA,
                username: usernameA,
                email: emailA,
                password: await encrypt(passwordA),
                phone: phoneA,
                role: roleA
            }
            let user = new User(data)
            await user.save()
            return console.log('A default admin has been created.')
        } else {
            return console.log('Default admin cannot be created.')
        }

    } catch (err) {
        console.error(err)
        
    }
}

defaultAdmin('Dylan ', 'Julian', '1dylan', 'djulian@gmail.com', '123123Aa!', '123123123', 'ADMIN')


export const changeRole = async(req, res)=>{
    try {
        let {id} = req.params

        let data = req.body
        let update = checkUpdate(data.role, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be update or missing' })

        let updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedUser) return res.status(404).send({ message: 'User not found' })
        
        return res.status(200).send({message: 'The role has been changed successfully.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error changing role'})
    }

}


//UPDATE
export const updateUser = async (req, res) => {
    try {
        //Getting the id by the token
        let { _uid } = req.user
        
        let { id } = req.params
        
        let data = req.body
        
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Data cannot be updated or  data missing' })

        let updatedUser = await User.updateOne(
            { _id: id },
            data,
            { new: true }
        )

        if (!updatedUser) return res.status(404).send({ message: 'User not found' })

        return res.status(200).send({message: 'User updated successfully.'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating the user'})
    }
}

//DELETE
export const deleteUser = async(req, res)=>{
    try {
    
        let {id } = req.params
        let {_id} = req.user
        let user = await User.findOne({_id: id})
        if(user.username == '1dylan') return res.status(403).send({message: 'You cannot delete the default admin'})

         //Validation for the user if try to delete another user that not might his own user
        
        let deletedUser = await User.findOneAndDelete(id)

        if (!deletedUser) return res.status(404).send({ message: 'User not found' })
        
        return res.send({message: `Account with username ${deletedUser.name} deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}

export const updateUsuarioNormal = async(req, res)=>{
    try{
        const { id } = req.params
        const data = req.body

        if(req.user.uid != id){
            return res.send(
                {
                    success: false,
                    message: `${req.user.name} | No puedes actualizar un perfil que no sea tuyo`
                }
            )
        }

        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const updateUsuarioAdmin = async(req, res)=>{
    try{
        const { id } = req.params
        const data = req.body
        
        const usuarioQueVaAActualizar = await User.findById(req.user.uid)
        const usuarioAActualizar = await User.findById(id)

        
        if(usuarioAActualizar.role === 'ADMIN'){
            return res.send(
                {
                    success: false,
                    message: `No se puede actualizar a otro admin`
                }
            )
        }

        if(usuarioAActualizar.role ==='CLIENTE' && usuarioQueVaAActualizar.role==='ADMIN'){
            return res.send(
                {
                    success: false,
                    message: 'Un error en algo'
                }
            )
        }
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => ({ msg: err.message }))
            return res.status(400).send({ message: 'Validation errors', errors })
        }
        return res.status(500).send({message: 'General error with user registration', error})
    }    
}

export const deleteClient = async(req,res)=>{
    try {
        let {_id} = req.user
        
        let { id} = req.params
        
        let {password} = req.body
        //Validating that the client cannot delete an admin
        let user = await User.findOne({_id:id})
        if(user.role == 'ADMIN') return res.status(401).send({message: 'You cannot delete an admin.'})
        
        if(_id != id) return res.status(401).send({message: 'You only can delete your account.'}) 

        let check = await checkPassword(password, user.password)
        if(!check) return res.status(401).send({message: 'Invalid password'})
        
        let deletedU = await User.findOneAndDelete(id)

        if (!deletedU) return res.status(404).send({ message: 'User not found' })
        
        return res.send({message: `The Account | ${deletedU.name} | deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
