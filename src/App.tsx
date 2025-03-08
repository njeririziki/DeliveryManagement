import { ErrorProvider  } from "./context/ErrorHandlingContext";
import Routing from "./pages/Routing"


function App() {
  return (
    <ErrorProvider>
    <Routing />
    </ErrorProvider>
  );
}


export default App
