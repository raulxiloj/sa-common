import mongoose from 'mongoose';

//Interface for the properties that are required to create a new category
interface CategoryAttrs {
    nombre: string;
    productos: string[];
}

//Interface for the properties that a category document has
interface CategoryDoc extends mongoose.Document {
    nombre: string;
    productos: string[];
}

//Interface for the properties that a category model has
interface CategoryModel extends mongoose.Model<CategoryDoc> {
    build(attrs: CategoryAttrs): CategoryDoc;
}

const categorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    productos: [{
        type: String
    }]
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

categorySchema.statics.build = (attrs: CategoryAttrs) => {
    return new Category(attrs);
}

const Category = mongoose.model<CategoryDoc,CategoryModel>('User', categorySchema);

export { Category };