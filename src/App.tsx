import { ErrorProvider  } from "./context/ErrorHandlingContext";
import Routing from "./pages/Routing"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ErrorProvider>
    <Routing />
    </ErrorProvider>
    </QueryClientProvider>
  );
}


export default App
