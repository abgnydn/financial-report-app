import { useMutation, useQueryClient } from "react-query";

import { updateTransactions } from "../data/api";

export const useUpdateTransactionsMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation(["data"], updateTransactions, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  if (error) {
    console.error(error);
  }

  return mutate;
};
