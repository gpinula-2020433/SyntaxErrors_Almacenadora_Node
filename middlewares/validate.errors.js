//Validar los errore  del middleware
import { validationResult } from "express-validator";

export const validateErrors = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(errors)
    }
    next()
}

export const validateErrorsWithoutFiles = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).send(
            {
                success: false,
                message: 'Error with validations',
                errors: errors.errors
            }
        )
    }
    next()
}
