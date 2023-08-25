import { SelectionContext } from "../../context/SelectionContext";
import { useContext, useEffect, useState } from "react";
import { Data, SubCategory } from "../../types";

type CustomCellProps = {
  category: string;
  breakdown: SubCategory;
  data: Data;
};
export const CustomCell: React.FC<CustomCellProps> = ({
  category,
  breakdown,
  data,
}) => {
  const { handleSelection, subcategory, date, isOpen } =
    useContext(SelectionContext);
  const [isSelected, setIsSelected] = useState(false);
  const [cellValues, setCellValues] = useState({
    category: "",
    subcategory: "",
    date: "",
  });
  useEffect(() => {
    if (
      isOpen &&
      category === cellValues.category &&
      subcategory === cellValues.subcategory &&
      date === cellValues.date
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [isOpen, category, date, subcategory, cellValues]);

  const handleClick = (category: string, subcategory: string, date: string) => {
    setCellValues({ category, subcategory, date });
    handleSelection(category, subcategory, date);
  };
  return (
    <div
      className={`flex items-center justify-end pr-3 border hover:bg-yellow-100 hover:border-yellow-300 cursor-pointer   h-[42px] ${
        isSelected ? "bg-yellow-100" : ""
      }`}
      onClick={() => handleClick(category, breakdown.name, data.date)}
    >
      {breakdown.amount.toLocaleString()}
    </div>
  );
};
