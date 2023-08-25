import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SelectionContextProps {
  category: string;
  subcategory: string;
  isOpen: boolean;
  date: string;
  handleSelection: (
    category: string,
    subcategory: string,
    date: string
  ) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

const defaultSelectionContext: SelectionContextProps = {
  category: "",
  subcategory: "",
  date: "",
  isOpen: false,
  setIsOpen: () => {},
  handleSelection: () => {},
  toggleSidebar: () => {},
};

export const SelectionContext = createContext<SelectionContextProps>(
  defaultSelectionContext
);

interface SelectionProviderProps {
  children: ReactNode;
}

const SelectionProvider = ({ children }: SelectionProviderProps) => {
  const [category, setCategory] = useState("banks");
  const [subcategory, setSubcategory] = useState("First Republic Savings");
  const [date, setDate] = useState("2022-09");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (
    category: string,
    subcategory: string,
    date: string
  ) => {
    setIsOpen(true);
    setCategory(category);
    setSubcategory(subcategory);
    setDate(date);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const selectionContextValue: SelectionContextProps = {
    category,
    subcategory,
    date,
    isOpen,
    setIsOpen,
    handleSelection,
    toggleSidebar,
  };

  return (
    <SelectionContext.Provider value={selectionContextValue}>
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionProvider;
