//Modelo de usuario
 
import {Schema, model} from 'mongoose'
 
const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength:[25, `Can't be overcame 25 characters`]
 
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `can't be overcame 25 characters`]
        },
        username: {
            type: String,
            unique: [true, 'Username is alredy taken'],
            lowercase: true,
            maxLength: [15, `can't be overcame 25 characters`]
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `can't be overcame 16 characters`],
        },
        profilePicture: {
            type: String
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8,`can't be overcame 16 characters`],
            maxLength: [13, 'Phone must be 13 numbers'],
 
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['TEACHER_ROLE', 'STUDENT_ROLE']
        }
    }
)

//Excluis datos en la respuesta
userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject()
    return user
}
export default model('User', userSchema)