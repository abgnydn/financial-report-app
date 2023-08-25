import { mockData } from "./mockData";
import { Categories, Category, Data, SubCategory, Transaction } from "../types";

export const data: Data[] = JSON.parse(JSON.stringify(mockData));

export const getAllData = async (): Promise<Data[]> => {
  // Simulate the API request with a timeout
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return the mock data
  return data;
};

type GetBreakDownDetailsProps = {
  date: string;
  category: string;
  subcategory: string;
};

export const getBreakdownDetails = ({
  date,
  category,
  subcategory,
}: GetBreakDownDetailsProps) => {
  const dataByDate = data && data.find((d: Data) => d.date === date);

  const categories = dataByDate?.categories;

  const indexOfCategory =
    categories && Object.keys(categories).findIndex((c) => c === category);

  const breakdownDetails =
    indexOfCategory !== undefined &&
    categories &&
    Object.values(categories)[indexOfCategory].breakdown?.find(
      (br: SubCategory) => br.name === subcategory
    );

  return breakdownDetails;
};

type UpdateTransactionsProps = {
  date: string;
  category: string;
  subcategory: string;
  id: string;
  targetCategory: string;
  targetSubcategory: string;
};

export const updateTransactions = async ({
  date,
  category,
  subcategory,
  id,
  targetCategory,
  targetSubcategory,
}: UpdateTransactionsProps): Promise<void> => {
  const dataByDate = data.find((d: Data) => d.date === date);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (dataByDate) {
    const categories = dataByDate.categories;

    const indexOfCategory = Object.keys(categories).findIndex(
      (c) => c === category
    );

    if (indexOfCategory !== -1) {
      const categoryKey = Object.keys(categories)[indexOfCategory];
      const categoryDetails = categories[categoryKey as keyof Categories];
      const breakdownDetails = categories?.[
        categoryKey as keyof typeof categories
      ]?.breakdown?.find((br: SubCategory) => br.name === subcategory);

      if (breakdownDetails) {
        const transactions = breakdownDetails.transactions;
        const transactionIndex = transactions?.findIndex(
          (transaction: Transaction) => {
            return transaction.id === id;
          }
        );
        if (transactionIndex !== -1 && transactionIndex !== undefined) {
          const transaction = transactions?.[transactionIndex];
          const targetIndexOfCategory = Object.keys(categories).findIndex(
            (c) => c === targetCategory.toLowerCase()
          );

          if (targetIndexOfCategory !== -1) {
            const targetCategoryKey =
              Object.keys(categories)[targetIndexOfCategory];
            const targetCategoryDetails =
              categories[targetCategoryKey as keyof Categories];

            const targetBreakdownDetails = categories?.[
              targetCategoryKey as keyof typeof categories
            ]?.breakdown?.find(
              (br: SubCategory) => br.name === targetSubcategory
            );

            if (targetBreakdownDetails && transaction) {
              const targetTransactions = targetBreakdownDetails.transactions;
              targetTransactions?.push({ ...transaction });
              transactions?.splice(transactionIndex, 1);

              // Recalculate the amounts for both the source and target categories
              calculateCategoryAmount(categoryDetails);
              calculateCategoryAmount(targetCategoryDetails);

              // Log the updated data
              console.log(data);

              return;
            }
          }
        }
      }
    }
  }

  // Handle the case where the data or specific details are not found
  console.log("Data or specific details not found");
};

function calculateCategoryAmount(category: Category) {
  let categoryTotal = 0;
  category?.breakdown?.forEach((breakdown) => {
    const breakdownTotal = calculateBreakdownAmount(breakdown);
    breakdown.amount = breakdownTotal; // Update the amount of the breakdown
    categoryTotal += breakdownTotal;
  });
  category.amount = categoryTotal; // Update the amount of the category

  return categoryTotal;
}

function calculateBreakdownAmount(breakdown: SubCategory) {
  let breakdownTotal = 0;
  breakdown?.transactions?.forEach((transaction) => {
    breakdownTotal += transaction.amount;
  });
  breakdown.amount = breakdownTotal; // Update the amount of the breakdown

  return breakdownTotal;
}
