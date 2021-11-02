import mongoose from 'mongoose';
import { Password } from '../services/password';

//Interface for the properties that are required to create a new customer
interface UserAttrs {
    id: string;
    nombre: string;
    apellido: string;
    foto?: string;
    correo: string;
    password: string;
    tipo: string;
    tarjetas?: [ 
        {   titular: string; 
            numero: string; 
            vencimiento: string 
        }
    ]
}

//Interface that describes the properties that a customer document has 
interface UserrDoc extends mongoose.Document {
    nombre: string;
    apellido: string;
    foto?: string;
    correo: string;
    tipo: string;
    tarjetas: [ 
        { titular: string; 
            numero: string; 
            vencimiento: string 
        }
    ]
}

//Interface that describes the properties that a customer model has
interface UserModel extends mongoose.Model<UserrDoc> {
    build(attrs: UserAttrs): UserrDoc;
}

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    foto: String,
    correo: {
        type: String,
        required: true
    },
    tipo: {//This should be an enum.... but well there's not time :D
        type: String,
        required: true
    },
    tarjetas: [
        {
            titular: String,
            numero: String,
            vencimiento: String
        }
    ]
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function (done) {
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserrDoc,UserModel>('User', userSchema);

export { User };