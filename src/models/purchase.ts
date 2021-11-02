import mongoose from 'mongoose';

//Interface for the properties that are required to create a new purchase
interface PurchaseAttrs {
    userId: string;
    nombre: string;
    nit: string;
    fecha: Date;
    products?: [
        {
            nombre: string;
            precio: number;
        }
    ];
}

//Interface for the properties that a purchase document has
interface PurchaseDoc extends mongoose.Document {
    userId: string;
    nombre: string;
    nit: string;
    fecha: Date;
    products?: [
        {
            nombre: string;
            precio: number;
        }
    ];
}

//Interface for the properties that provider model has
interface PurchaseModel extends mongoose.Model<PurchaseDoc> {
    build(attrs: PurchaseAttrs): PurchaseDoc;
}

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    nit: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    products: [
        {
            nombre: String,
            precio: Number
        }
    ]
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

purchaseSchema.statics.build = (attrs: PurchaseAttrs) => {
    return new Purchase({
        userId: attrs.userId,
        nombre: attrs.nombre,
        nit: attrs.nit,
        fecha: attrs.fecha,
        products: attrs.products
    });
}

const Purchase = mongoose.model<PurchaseDoc, PurchaseModel>('Purchase', purchaseSchema);

export { Purchase };