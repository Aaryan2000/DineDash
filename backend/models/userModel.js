import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{type: String,required:true},
    email:{type: String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type: Object,default:{}}
},{minimize:false})

const userModel=mongoose.models.user || mongoose.model("user",userSchema)


export default userModel;




/*In Mongoose, the minimize option is used to control whether empty objects are removed from the document when it is saved. By default, Mongoose removes empty objects to save space. However, there might be situations where you want to keep empty objects in the document. Setting { minimize: false } ensures that empty objects are not removed. */

/*Mongoose keeps a cache of models that have already been created. mongoose.models is an object where the keys are the names of the models and the values are the models themselves.
mongoose.models.user checks if a model named "user" already exists in the cache. */