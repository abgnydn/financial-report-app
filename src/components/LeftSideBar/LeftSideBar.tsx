import { useState } from "react";
import { Categories, Data } from "../../types";
import SideBarDropdown from "./SideBarDropdown";
import { ArrowDownIcon, ArrowRightIcon } from "../../icons";

type LeftSideBarProps = {
  data: Data[];
};
type LeftSideBarChildrenProps = {
  title: string;
  drop: boolean;
  category?: keyof Categories;
};

const renderNormalTitle = (value: string, i: number) => {
  return (
    <div key={i} className="bg-gray-50 font-semibold py-1 pl-2 mt-10 h-8 ">
      {value}
    </div>
  );
};

const LeftSideBar: React.FC<LeftSideBarProps> = ({ data }) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

  const handleTitleClick = () => {
    setSideBarOpen(!sideBarOpen);
  };

  if (!data) {
    return null;
  }

  const sideBarChildren: LeftSideBarChildrenProps[] = [
    { title: "Banks", drop: true, category: "banks" },
    { title: "Credit Cards", drop: true, category: "credit" },
    { title: "Available Starting Balance", drop: false },
    { title: "Income", drop: true, category: "income" },
    { title: "Cost of Goods Sold", drop: true, category: "cogs" },
    { title: "Gross Profit", drop: false },
    { title: "Expense", drop: true, category: "expense" },
    { title: "Net Income", drop: false },
  ];

  const icon = sideBarOpen ? <ArrowDownIcon /> : <ArrowRightIcon />;
  return (
    <div className="flex flex-col z-10 w-1/4 bg-transparent min-w-[300px] h-screen shadow-[10px_0px_50px_1px_rgba(0,0,0,0.2)]">
      <div
        className="flex flex-row justify-between cursor-pointer border items-center py-6 px-2 "
        onClick={handleTitleClick}
      >
        <h2 className="text-2xl font-bold">Financial Report</h2>
        {icon}
      </div>
      <div className={`${sideBarOpen ? "flex" : "hidden"} flex-col`}>
        {sideBarChildren.map((child, i) =>
          child.drop && child.category ? (
            <SideBarDropdown
              data={data}
              title={child.title}
              category={child.category as keyof Categories}
              key={i}
            />
          ) : (
            renderNormalTitle(child.title, i)
          )
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
