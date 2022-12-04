import Main from "./layout/Main";
import { createContext, useState } from "react";
import Login from "./components/login/Login";
import { Provider } from "react-redux";
import store from "./store";

interface IContext {
  Auth: boolean;
  setAuth: (value: boolean) => void;
}

const CheckLocalStorage = () => {
  const auth = localStorage.getItem("auth");
  if (auth === "true") {
    return true;
  }
  return false;
};

export const AppContext = createContext({} as IContext);

function App() {
  const [Auth, setAuth] = useState(CheckLocalStorage());

  return (
    <AppContext.Provider value={{ Auth, setAuth }}>
      <Provider store={store}>{Auth ? <Main /> : <Login />}</Provider>
    </AppContext.Provider>
  );
}

export default App;
