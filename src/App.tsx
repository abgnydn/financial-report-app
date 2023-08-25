import Report from "./components/Report";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import DropdownProvider from "./context/DropdownContext";
import SelectionProvider from "./context/SelectionContext";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SelectionProvider>
        <DropdownProvider>
          <Report />
        </DropdownProvider>
      </SelectionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
