import express from 'express'
const app=express();
app.post('/hdfcwebhook',(req,res)=>{
    const  paymentInfo={
        //have zod validation here 
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    }

})
// this is the endpoin where the hdfc bank will it , and this end point direcly talk to my db or backend to add the money which it get it from hdfc bank (but not the frontend) , and later the hdfc bank will pay for my bank account later 