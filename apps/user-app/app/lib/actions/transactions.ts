import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";

export async function getp2pTransfer() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) return [];

  const p2ptxn = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
    include: {
      fromUser: { select: { name: true, email: true, number: true } },
      toUser: { select: { name: true, email: true, number: true } },
    },
  });

  return p2ptxn.map((t) => ({
    id: t.id,
    amount: t.amount,
    timestamp: t.timestamp.toISOString(), // ✅ Ensuring timestamp is a string
    from: t.fromUser.name || t.fromUser.email || t.fromUser.number,
    to: t.toUser.name || t.toUser.email || t.toUser.number,
  }));
}
