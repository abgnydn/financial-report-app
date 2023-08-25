import { useQuery } from "react-query";

import { getBreakdownDetails } from "../data/api";
import { SubCategory } from "../types";

type useGetBreakdownDetailsQueryProps = {
  category: string;
  subcategory: string;
  date: string;
};

export const useGetBreakdownDetailsQuery = ({
  category,
  subcategory,
  date,
}: useGetBreakdownDetailsQueryProps) => {
  // Define the fetchData function to fetch data

  const fetchData = async () => {
    // Simulate the API request with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return the mock data
    return getBreakdownDetails({
      date: date,
      category: category,
      subcategory: subcategory,
    });
  };
  const fallback = {
    transactions: [],
    name: "",
    amount: 0,
  };
  // Use the `useQuery` hook from React Query to handle the fetching
  const {
    data: breakdownDetailsData = fallback,
    error,
    isLoading,
  } = useQuery(["breakdownDetails", category, subcategory, date], fetchData);

  if (error) {
    console.error(error);
  }
  // Return the fetched data
  return {
    breakdownDetailsData: breakdownDetailsData as SubCategory,
    isLoading: isLoading,
  };
};
