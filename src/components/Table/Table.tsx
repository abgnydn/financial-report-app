import { Data } from "../../types";
import { useContext } from "react";
import { DropdownContext } from "../../context/DropdownContext";
import TableRow from "./TableRow";
import { convertDateFormat } from "../../utils/convertDateFormat";

interface TableProps {
  data: Data[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const { isVisibleMap } = useContext(DropdownContext);
  const { Expense, Banks, Income, CostofGoodsSold } = isVisibleMap;

  const calculateGP = (d: Data) => {
    // Gross Profit
    const income = d.categories.income.amount || 0;
    const cogs = d.categories.cogs.amount || 0;

    const gp = income - cogs;
    return parseFloat(gp.toFixed(3));
  };

  const calculateASB = (d: Data) => {
    // Available Starting Balance
    const income = d.categories.income.amount || 0;
    const credit = d.categories.credit.amount || 0;
    const asb = income - credit;
    return parseFloat(asb.toFixed(3));
  };

  const calculateNetIncome = (d: Data) => {
    const expense = d.categories.expense.amount || 0;
    const gp = calculateGP(d);
    const netIncome = expense - gp;
    return parseFloat(netIncome.toFixed(3));
  };

  const renderTableHeader = () => {
    return (
      <tr className="b">
        {data.map((d) => (
          <th key={d.date} className="pl-6 py-4 pr-2 border">
            <div className="font-thin">Actual</div>
            <div className="truncate">{convertDateFormat(d.date)}</div>
          </th>
        ))}
      </tr>
    );
  };
  const renderTableEmptyRow = () => {
    return (
      <tr className="border h-[41.5px]">
        {data.map((_, i) => (
          <td key={i} className="border "></td>
        ))}
      </tr>
    );
  };
  const renderTableCalculatedRow = (calculate: (d: Data) => number) => {
    return (
      <tr className="border bg-gray-100 h-[31px] font-mono">
        {data.map((d, i) => (
          <td key={i} className="border pr-3">
            {calculate(d)}
          </td>
        ))}
      </tr>
    );
  };
  const renderTableRows = () => {
    return (
      <>
        <TableRow data={data} property="banks.amount" open={Banks} />
        {Banks && <TableRow data={data} property="banks.breakdown" />}
        <TableRow data={data} property="credit.amount" />
        {renderTableEmptyRow()}
        {renderTableCalculatedRow(calculateASB)}
        <TableRow data={data} property="income.amount" open={Income} />
        {Income && <TableRow data={data} property="income.breakdown" />}
        <TableRow data={data} property="cogs.amount" open={CostofGoodsSold} />
        {CostofGoodsSold && <TableRow data={data} property="cogs.breakdown" />}
        {renderTableEmptyRow()}
        {renderTableCalculatedRow(calculateGP)}
        <TableRow data={data} property="expense.amount" open={Expense} />
        {Expense && <TableRow data={data} property="expense.breakdown" />}
        {renderTableEmptyRow()}
        {renderTableCalculatedRow(calculateNetIncome)}
      </>
    );
  };

  return (
    data && (
      <div className="overflow-x-scroll">
        <table className="bg-gray-50 text-right table-auto  ">
          <thead>{renderTableHeader()}</thead>
          <tbody className="font-mono">{renderTableRows()}</tbody>
        </table>
      </div>
    )
  );
};

export default Table;
