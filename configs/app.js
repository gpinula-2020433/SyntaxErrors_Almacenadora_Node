'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import userRoutes from '../src/user/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import productRoutes from '../src/product/product.routes.js'
import { limiter } from '../middlewares/rate.limit.js'
import { addDefaultCategory } from '../src/category/category.controller.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use(authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/product', productRoutes)
    app.use('/v1/category', categoryRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
        addDefaultCategory()
    }catch(err){
        console.error('Server init failed', err)
    }
}