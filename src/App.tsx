import { LoginCheckProvider } from "components/context/LoginCheckContext";
import Router from "./Router/Router";

function App() {
  return (
    <LoginCheckProvider>
      <Router />
    </LoginCheckProvider>
  );
}

export default App;
