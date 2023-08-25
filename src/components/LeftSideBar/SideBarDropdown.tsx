import { ListIcon } from "../../icons";
import TitleWithIcon from "./TitleWithIcon";
import { useState } from "react";

import { useUpdateTransactionsMutation } from "../../hooks/useUpdateTransactionsMutation";

import { SubCategory, Data, Categories } from "../../types";
import { DragEvent } from "react";

type SideBarDropdownProps = {
  data: Data[];
  title: string;
  category: keyof Categories;
};

const SideBarDropdown: React.FC<SideBarDropdownProps> = ({
  data,
  title,
  category,
}) => {
  const updateTransactions = useUpdateTransactionsMutation();
  const [open, setOpen] = useState(false);
  const disabled = data.every((d) => d.categories[category]?.amount === 0);

  const handleDrop = (e: DragEvent<HTMLDivElement>, value: SubCategory) => {
    (e.target as Element).classList.remove("bg-red-100");

    const stringData = e.dataTransfer?.getData("text");
    const [id, category, subcategory, date] = stringData.split(".");

    if (subcategory === value.name) {
      e.preventDefault();
    } else {
      updateTransactions({
        date: date,
        category: category,
        subcategory: subcategory,
        id: id,
        targetCategory: title === "Cost of Goods Sold" ? "cogs" : title,
        targetSubcategory: value.name,
      });
    }
  };
  const handleDragEnter = (
    e: DragEvent<HTMLDivElement>,
    value: SubCategory
  ) => {
    const stringData = e.dataTransfer?.getData("text");

    const subcategory = stringData.split(".")[3];

    if (subcategory !== value.name) {
      (e.target as Element).classList.add("bg-blue-100");
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    (e.target as Element).classList.remove("bg-blue-100");
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <TitleWithIcon
        title={title}
        disabled={disabled}
        setOpen={setOpen}
        open={open}
      />

      <div className={`${open ? "flex" : "hidden"} flex-col`}>
        <div className="flex flex-row gap-3 py-2 ml-12">
          <div>
            <ListIcon />
          </div>
          <div>{title}</div>
        </div>
        {data[0].categories[category as keyof Categories].breakdown?.map(
          (subcategory, i) => (
            <div
              className="border-t"
              key={i}
              onDrop={(e) => handleDrop(e, subcategory)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDragEnter={(e) => handleDragEnter(e, subcategory)}
            >
              <div className="flex flex-row gap-3 py-2 ml-12">
                <div>
                  <ListIcon />
                </div>
                <div>{subcategory.name}</div>
              </div>
            </div>
          )
        )}
        <div className="py-2 pl-10 italic font-bold border-y pr-3">
          {title} Total
        </div>
      </div>
    </div>
  );
};

export default SideBarDropdown;
