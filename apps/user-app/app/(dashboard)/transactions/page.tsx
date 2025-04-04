import { TransactionCard } from "../../../components/TransactionCard";
import { getp2pTransfer } from "../../lib/actions/transactions";

TransactionCard
export default async function TransactionsPage() {
  const transactions = await getp2pTransfer();

  return (
    <div className="w-full">
      <TransactionCard transactions={transactions} />
    </div>
  );
}
