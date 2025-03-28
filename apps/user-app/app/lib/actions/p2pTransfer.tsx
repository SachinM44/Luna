"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

interface p2pTransferInputs {
    to: string;
    amount: number;
}

export async function p2pTransferto({ to, amount }: p2pTransferInputs) {
    const session = await getServerSession(authOptions);
    const fromUser = Number(session?.user?.id);

    if (!fromUser) {
        return { msg: "Error while sending the money" };
    }

    const toUser = await prisma.user.findFirst({
        where: { number: to }
    });

    if (!toUser) {
        return { msg: "User not found" };
    }

    await prisma.$transaction(async (tx) => {

        const fromUserBalance = await tx.balance.findUnique({
            where: { userId: Number(fromUser) }
        });

        

        if (!fromUserBalance || fromUserBalance.amount < amount) {
            throw new Error("Insufficient balance");
        }

        await tx.balance.update({
            where: { userId: Number(fromUser) },
            data: { amount: { decrement: amount } }
        });

        await tx.balance.update({
            where: { userId: Number(toUser.id) },
            data: { amount: { increment: amount } }  
        });
        await tx.p2pTransfer.create({
            data:{
                fromUserId:fromUser,
                toUserId:toUser.id,
                amount,
                timestamp:new Date()
            }
        })
    }, { isolationLevel: "Serializable" });  
}
