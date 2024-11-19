import { Route, Switch } from "react-router-dom";
import style from "./App.module.scss";
import LoginContainer from "./components/LoginContainer";
import TestEditContainer from "./components/TestEditContainer";
import HeaderContainer from "./components/HeaderContainer";
import TestMainPageContainer from "./components/TestMainPageContainer";
import ModalContainer from "./components/ModalContainer";
import RegistryContainer from "./components/RegistryContainer";

let App = () => {
  return (
    <div className={style.container}>
      <HeaderContainer />
      <Switch>
        <Route path="/login" exact>
          <LoginContainer />
        </Route>
        <Route path="/testedit">
          <TestEditContainer />
        </Route>
        <Route path="/registry">
          <RegistryContainer />
        </Route>
        <Route path="/">
          <TestMainPageContainer />
        </Route>
      </Switch>
      <ModalContainer />
    </div>
  );
};

export default App;
