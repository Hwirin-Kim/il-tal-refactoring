import { LoginCheckProvider } from "components/context/LoginCheckContext";
import Router from "./Router/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <LoginCheckProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </LoginCheckProvider>
  );
}

export default App;
