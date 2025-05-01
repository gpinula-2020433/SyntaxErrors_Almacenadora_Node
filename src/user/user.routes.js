import { Router } from "express";
import { changeRole, deleteClient, deleteUser, test, updateUser, updateUsuarioNormal, getAll, updateUsuarioAdmin} from "./user.controller.js";
import { validateJwt, isAdmin, isClient } from "../../middlewares/validate.jwt.js";

const api = Router()

api.get('/test', test)

//Admin
api.get('/getAllUsers', getAll)
api.put('/updateAdmin/:id', [validateJwt,isAdmin], updateUsuarioAdmin)
api.delete('/deleteUser/:id', [validateJwt,isAdmin], deleteUser)
api.put('/changeRole/:id',[validateJwt,isAdmin], changeRole)

//Client
api.put('/updateClient/:id', [validateJwt, isClient], updateUsuarioNormal)
api.delete('/deleteClient/:id', [validateJwt, isClient], deleteClient)
export default api