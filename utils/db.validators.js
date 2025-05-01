import User from '../src/user/user.model.js'
import Product from '../src/product/product.model.js'
import Category from '../src/category/category.model.js'

export const existUsername = async(username, user)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id != user.uid)
        {
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Emal ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}

//Se usa en jwt para encontrar el usuario
export const findUser = async(id)=>{
    try {
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    } catch (err) {
        console.error(err)
        return false
    }
}

//Validar que sea un id  la llave foranea
export const objectIdValid = (objectId)=>{
    if(!isValidObjectId(objectId)) throw new Error(`The value of field is not a valid ObjectId`)
}


export const existNameProduct = async(nameProduct)=>{
    const alreadyNameProduct = await Product.findOne({nameProduct})
    if(alreadyNameProduct){
        console.error(`The product | ${nameProduct} | already exists`)
        throw new Error(`The product | ${nameProduct} | already exists`)
    }
}

export const existNameCategory = async(nameCategory)=>{
    const alreadyNameCategory = await Category.findOne({nameCategory})
    if(alreadyNameCategory){
        console.error(`The Category | ${nameCategory} | already exists`)
        throw new Error(`The Category | ${nameCategory} | already exists`)
    }
}
