"use client";

import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";

export function TransactionCard({
  transactions,
}: {
  transactions: {
    id: number;
    amount: number;
    timestamp: Date;
    from: string;
    to: string;
  }[];
}) {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="p-4">
        {transactions.map((txn) => (
          <div key={txn.id} className="border-b border-gray-200 py-2">
            <div className="flex justify-between">
              <span className="font-semibold">{txn.from}</span>
              <span className="text-sm text-gray-500">
                {new Date(txn.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm text-gray-700">→ {txn.to}</span>
              <span className="font-semibold">${txn.amount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
