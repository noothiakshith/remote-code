import express  from "express";
const router = express.Router()

router.get('/api/problems',async(req,res,next)=>{
    //currently not there need to update the schema
    //TODO://write the routes after updating the schema

})

router.get('/api/problems/:id',async(req,res,next)=>{
    const problemid = req.params.id;
    console.log(problemid);
    //TODO: complete the routes after updating the schema
})





export default router