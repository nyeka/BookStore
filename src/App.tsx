import Main from "./layout/Main";
import { createContext, useState } from "react";
import Login from "./components/login/Login";

interface IContext {
  Auth: boolean;
  setAuth: (value: boolean) => void;
}

export const AppContext = createContext({} as IContext);

function App() {
  const [Auth, setAuth] = useState(false);

  return (
    <AppContext.Provider value={{ Auth, setAuth }}>
      {Auth ? <Main /> : <Login />}
    </AppContext.Provider>
  );
}

export default App;
