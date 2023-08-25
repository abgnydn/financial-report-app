import { Data, Category, SubCategory, Categories } from "../../types";
import { CustomCell } from "./CustomCell";

type TableRowProps = {
  data: Data[];
  property: string;
  open?: boolean;
};

const TableRow: React.FC<TableRowProps> = ({ data, property, open }) => {
  const [category, subProperty] = property.split(".");

  const categories: Categories[] = data.map((d) => d.categories);
  const categoryKey = Object.keys(categories[0]).find((c) => c === category);

  return (
    <tr>
      {data.map((d, i) => {
        const categoryDetails = categories[i][
          categoryKey as keyof (typeof categories)[0]
        ] as Category;

        return (
          <td key={i} className="text-right border border-gray-300 ">
            {subProperty === "amount" ? (
              <div className="pt-4  pb-[1.5px] h-[70px] pr-3 flex flex-col justify-end">
                {!open && categoryDetails[subProperty].toLocaleString()}
              </div>
            ) : (
              <>
                {!open && <div className="h-[35px]"></div>}

                {Array.isArray(
                  categoryDetails[subProperty as keyof Category]
                ) &&
                  (
                    categoryDetails[
                      subProperty as keyof Category
                    ] as SubCategory[]
                  ).map((br, i) => (
                    <CustomCell
                      key={i}
                      data={d}
                      breakdown={br}
                      category={category}
                    />
                  ))}

                <div className="flex justify-end items-center  pr-3 h-[39px]">
                  {categoryDetails["amount"].toLocaleString()}
                </div>
              </>
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
