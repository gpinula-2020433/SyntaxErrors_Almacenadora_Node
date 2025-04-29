//Rutas de autenticacion
import { Router } from "express";
import { 
    login,
    registerteacher,
    registerstudent,
    test 
} from "./auth.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { registerValidator } from "../../middlewares/validators.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";

const api = Router()

//Rutas publicas
                    //Middlewares
api.post('/registerteacher', 
    [
        uploadProfilePicture.single("profilePicture"), 
        //Validador de errores
        registerValidator,
        //Ejecurarla validación de errores(delete.fil.on.errors.js)
        deleteFileOnError
    ], 
    registerteacher
)

api.post('/registerstudent', 
    [
        uploadProfilePicture.single("profilePicture"), 
        //Validador de errores
        registerValidator,
        //Ejecurarla validación de errores(delete.fil.on.errors.js)
        deleteFileOnError
    ], 
    registerstudent
)

api.post('/login', login)

//Rutas privadas
api.get('/test', validateJwt, test)

//Exporto las rutas
export default api
