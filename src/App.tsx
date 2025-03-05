import { UserProvider } from "./context/UserContext";
import Routing from "./pages/Routing"


function App() {
  return (
    <UserProvider>
    <Routing />
    </UserProvider>
  );
}


export default App
