import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://dubeynihal560:ySom4klWr9VVGCEd@cluster0.xmr3hb5.mongodb.net/food-delivery-app')
    .then(()=>console.log("DB Connected"));
}