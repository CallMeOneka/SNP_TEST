import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import style from "./App.module.scss";
import LoginContainer from "./components/LoginContainer";
import TestEditContainer from "./components/TestEditContainer";
import HeaderContainer from "./components/HeaderContainer";
import TestMainPageContainer from "./components/TestMainPageContainer";
import ModalContainer from "./components/ModalContainer";
import RegistryContainer from "./components/RegistryContainer";
import { useDispatch } from "react-redux";
import TestPassContainer from "./components/TestPassContainer";

let App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_CURRENT_USER" });
  }, [dispatch]);

  return (
    <div className={style.container}>
      <HeaderContainer />
      <Switch>
        <Route path='/login' exact>
          <LoginContainer />
        </Route>
        <Route path='/testedit/:testId'>
          <TestEditContainer />
        </Route>
        <Route path='/registry'>
          <RegistryContainer />
        </Route>
        <Route path='/testpass/:testId'>
          <TestPassContainer />
        </Route>
        <Route path='/'>
          <TestMainPageContainer />
        </Route>
      </Switch>
      <ModalContainer />
    </div>
  );
};

export default App;
