import { ChangeEvent, DragEvent, useState } from "react";
import { SearchIcon } from "../../icons";
import { useContext } from "react";
import { SelectionContext } from "../../context/SelectionContext";
import { useGetBreakdownDetailsQuery } from "../../hooks/useGetBreakdownDetailsQuery";
import { convertDateFormat } from "../../utils/convertDateFormat";
import { formatNumber } from "../../utils/formatNumber";
import { Transaction } from "../../types";
import { SidebarHeader } from "./SidebarHeader";
import { TransactionItem, TransactionItemSkeleton } from "./TransactionItem";

interface RightSideBarProps {
  // Add any additional props here
}

const RightSideBar: React.FC<RightSideBarProps> = () => {
  const { category, subcategory, date, isOpen, toggleSidebar, setIsOpen } =
    useContext(SelectionContext);

  const { breakdownDetailsData, isLoading } = useGetBreakdownDetailsQuery({
    category,
    subcategory,
    date,
  });

  const { transactions, name, amount } = breakdownDetailsData;
  const handleDrag = (
    e: DragEvent,
    id: string,
    category: string,
    subcategory: string,
    date: string
  ) => {
    const transactionValues = [id, category, subcategory, date];
    const stringifiedValues = transactionValues.join(".");
    e.dataTransfer.setData("text", stringifiedValues);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={`absolute top-0 right-0 w-[20vw]  h-screen z-40 
      ${
        isOpen
          ? "w-1/3 translate-x-0 bg-white border-4"
          : "translate-x-100 bg-transparent border-none"
      }
      `}
    >
      <button
        className={` bg-blue-500 text-white w-10 h-10 rounded-full top-3 fixed [clip-path:polygon(40%_0%,100%_0%,100%_100%,38%_100%)] ${
          isOpen ? "-left-5" : "right-0"
        }`}
        onClick={toggleSidebar}
      >
        =
      </button>

      {isOpen && category && subcategory && transactions && (
        <>
          <div className="bg-gray-600 color px-5 flex flex-col gap-3 pt-3">
            <SidebarHeader name={name} setIsOpen={setIsOpen} />
            <div className="flex flex-row justify-between text-white ">
              <div className="text-yellow-300 text-xs">
                {transactions.length}{" "}
                {transactions.length <= 1 ? "Transaction" : "Transactions"}
              </div>
              <div className="text-xs text-gray-300">
                {convertDateFormat(date, "long")}
              </div>
            </div>
            <div className="bg-white flex flex-row gap-3 border rounded-sm py-1 px-2">
              <div>
                <SearchIcon />
              </div>
              <input
                className="text-sm text-gray-400 w-full"
                onChange={handleChange}
                placeholder="Search"
              />
            </div>
            <div className="flex flex-row justify-between text-white">
              <div className="text-sm bg-blue-500 px-3 py-1">Tags</div>
              <div className="text-sm">+</div>
            </div>
          </div>
          <div className="bg-white flex flex-col">
            <div className="flex flex-row justify-between text-sm bg-gray-100 px-5 py-3 border-b-2">
              <div>{convertDateFormat(date)}</div>
              <div className="font-serif">{formatNumber(amount)}</div>
            </div>
            {transactions.length > 0 ? (
              transactions
                .filter((transaction: Transaction) =>
                  transaction.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((transaction: Transaction) => (
                  <TransactionItem
                    transaction={transaction}
                    handleDrag={handleDrag}
                    category={category}
                    subcategory={subcategory}
                    date={date}
                    key={transaction.id}
                  />
                ))
            ) : isLoading ? (
              <TransactionItemSkeleton />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default RightSideBar;
