import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter=express.Router();

//Image Storage engine

const storage=multer.diskStorage({/* storage: Defines the storage engine for multer. destination: Specifies the folder (uploads) where the uploaded files will be stored.filename: Defines the naming convention for the uploaded files. Here, it uses the current timestamp concatenated with the original file name to ensure unique file names. */
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})/* upload: An instance of multer configured to use the specified storage engine. */

foodRouter.post('/add',upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)





export default foodRouter;