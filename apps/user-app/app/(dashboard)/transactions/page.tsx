"use server"

import { getServerSession } from "next-auth"
import { TransactionCard } from "../../../components/TransactionCard"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client"
export async function getp2pTransfer(){
    const session=await getServerSession(authOptions)
    const userId=Number(session?.user.id);
    const p2ptxn=await prisma.p2pTransfer.findMany({
        where:{
            OR:[
                {fromUserId:userId},
                {toUserId:userId}
            ]
            
        },
        include:{
            fromUser:{select:{name:true, email:true, number:true}},
            toUser:{select:{name:true, email:true, number:true}}
        }
    })
           return p2ptxn.map(t=>({
            id:t.id,
            amount:t.amount,
            timestamp:t.timestamp,
            from:t.fromUser.name || t.fromUser.email || t.fromUser.number,
            to:t.toUser.name || t.toUser.email || t.toUser.number
           }));
}

export default async function() {
    const transactions=await getp2pTransfer();
    return <div className="w-full">
        
       <TransactionCard transactions={transactions}/>
    </div>
}