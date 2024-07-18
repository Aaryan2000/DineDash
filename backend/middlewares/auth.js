import jwt from 'jsonwebtoken'

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
       //  req.body.userId=token_decode.id;/*The line req.body.userId = token_decode; assigns the decoded token information to the userId field of the req.body object. Here's a step-by-step breakdown of what this line does in the context of a middleware function: */
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


export default authMiddleware;