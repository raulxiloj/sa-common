import mongoose from 'mongoose';

//Interface for the properties that are required for a product
interface ProductAttrs {
    userID: string;
    nombre: string;
    descripcion: string;
    foto: string;
    precio: number;
    stock: number;
}

//Interface for the properties that a ProductModel Document has
interface ProductDoc extends mongoose.Document {
    userID: string;
    nombre: string;
    descripcion: string;
    foto: string;
    precio: number;
    stock: number;
}

//Interface  for the properties that a product model has
interface ProductModel extends mongoose.Model<ProductModel> {
    build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
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

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product',productSchema);

export { Product };