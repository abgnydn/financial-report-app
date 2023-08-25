import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
} from "react";

type IsVisibleMap = {
  [key: string]: boolean;
};

type DropdownContextProps = {
  isVisibleMap: IsVisibleMap;
  setIsVisibleMap: Dispatch<SetStateAction<IsVisibleMap>>;
};

const defaultDropdownContext: DropdownContextProps = {
  isVisibleMap: {
    Banks: false,
    Income: false,
    CostofGoodsSold: false,
    Expense: false,
  },
  setIsVisibleMap: () => {},
};

export const DropdownContext = createContext<DropdownContextProps>(
  defaultDropdownContext
);

interface DropdownProviderProps {
  children: ReactNode;
}

const DropdownProvider = ({ children }: DropdownProviderProps) => {
  const [isVisibleMap, setIsVisibleMap] = useState<IsVisibleMap>(
    defaultDropdownContext.isVisibleMap
  );

  const dropdownContextValue: DropdownContextProps = {
    isVisibleMap,
    setIsVisibleMap,
  };

  return (
    <DropdownContext.Provider value={dropdownContextValue}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownProvider;
