import { Transaction } from "../../types";
import { formatNumber } from "../../utils/formatNumber";
import { DragEvent } from "react";

interface TransactionItemProps {
  transaction: Transaction;
  handleDrag: (
    e: DragEvent,
    id: string,
    category: string,
    subcategory: string,
    date: string
  ) => void;
  category: string;
  subcategory: string;
  date: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  handleDrag,
  category,
  subcategory,
  date,
}) => {
  return (
    <div
      className="pl-7 pr-5 flex flex-row justify-between py-1 items-center border-b-2 hover:bg-blue-200  hover:cursor-move"
      draggable={true}
      onDragStart={(e) =>
        handleDrag(e, transaction.id, category, subcategory, date)
      }
    >
      <div className="flex flex-col font-bold py-5 gap-1">
        <div className="text-xs text-gray-400">{transaction.date}</div>
        <div className="font-bold">{transaction.name}</div>
        <div className="text-xs font-bold text-gray-400">
          {transaction.service}
        </div>
      </div>
      <div className="font-serif">{formatNumber(transaction.amount)}</div>
    </div>
  );
};

export const TransactionItemSkeleton: React.FC = () => {
  return (
    <div className="pl-7 pr-5 flex flex-row justify-between py-1 items-center border-b-2 bg-blue-200 h-[114px]   animate-pulse">
      <div className="flex flex-col font-bold py-5 gap-1">
        <div className="bg-gray-400 w-20 h-4"></div>
        <div className="bg-gray-400 w-40 h-6"></div>
        <div className="bg-gray-400 w-32 h-3"></div>
      </div>
      <div className="bg-gray-400 w-24 h-3"></div>
    </div>
  );
};
