import express  from "express";
const router = express.Router()
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

router.get('/api/problems',async(req,res,next)=>{
    //currently not there need to update the schema
    //TODO://write the routes after updating the schema

})

router.get('/api/problems/:id',async(req,res,next)=>{
    const problemid = req.params.id;
    console.log(problemid);
    //TODO: complete the routes after updating the schema
})

router.get('/api/submission/:id',async(req,res,next)=>{
    const submissionid = req.params.id;
    try{
        const check = await prisma.submission.findUnique({
            where:{
                id:submissionid
            },
            select:{
                problemId:true,
                source_code:true,
                stdout:true,
                stdin:true,
                language:true,
                status:true,
                testCasesPassed:true,
                runtime:true,
                memoryUsage:true,
                errorMessage:true
            }
        })
        if(check){
            return res.status(200).json(check);
        }
        //FIXME:check again with the sujit ones
        else{
            return res.status(404).json({message:"Submission not found"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
})

app.post('/api/submission',async(req,res,next)=>{
    const{problemId,source_code,language,stdin} = req.body
    try{
        const submission = await prisma.submission.create({
            where:{
                id:problemId
            },
            data:{
                source_code,
                language,
                stdin,
                problemId
            }
        })
        //TODO:write the bullmq add the submission to the queue
        return res.status(200).json({message:"Submission created successfully",submission});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
})

router.patch('/api/submission/:id',async(req,res,next)=>{
    const id = req.params.id;
    try{
        const{testCasesPassed,stdout,status} = req.body
        if(status==="Accepted"){
            //TODO:remove all the deployments
            const updatedschema = await prisma.submission.update({
                where:{
                    id
                },
                data:{
                    status,
                    testCasesPassed
                }
            })
            return res.status(200).json({message:"Submission updated successfully", updatedschema});
        }
        else{
            const updatetheschema = await prisma.submission.update({
                where:{
                    id
                },
                data:{
                    stdout,
                    status
                }
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
})
export default router