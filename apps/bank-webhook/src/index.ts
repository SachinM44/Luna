import express from 'express'
import db from "@repo/db/client"
const app=express();
app.post('/hdfcwebhook',async (req,res)=>{
    const  paymentInfo={
        //have zod validation here 
        // check this request is actually came from hdfc bank 
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    }  
   try{
    await db.$transaction([
   await db.balance.update({
        where:{
            userId:Number(paymentInfo.userId)
        },
        data:{
            amount:{
                increment:paymentInfo.amount
            }
        }
    }) 

 await db.onRampTransaction.update({
    where:{
        token:paymentInfo.token
    },
    data:{
        status:'Success'
    }
  })
  res.status(200).json({
    msg:"captured"
  })
])
} catch(e){
    console.error()
    res.status(411).json({
        msg:"not able to campure"
    })
}
})
app.listen(3000)
// this is the endpoin where the hdfc bank will it , and this end point direcly talk to my db or backend to add the money which it get it from hdfc bank (but not the frontend) , and later the hdfc bank will pay for my bank account later 