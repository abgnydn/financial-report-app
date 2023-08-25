import { useQuery } from "react-query";

import { getAllData } from "../data/api";

export const useGetAllDataQuery = () => {
  // Define the fetchData function to fetch data

  // Use the `useQuery` hook from React Query to handle the fetching
  const { data, error } = useQuery(["data"], getAllData);

  if (error) {
    console.error(error);
  }

  // Return the fetched data
  return data;
};
