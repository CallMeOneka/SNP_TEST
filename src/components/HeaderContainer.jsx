import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectUserName } from "../redux/selectors/authSelector";
import Header from "./Header";

const HeaderContainer = () => {
  const isAuth = useSelector(selectIsAuth);
  const username = useSelector(selectUserName);
  const dispatch = useDispatch();
  let handleSignOut = useCallback(() => {
    dispatch({ type: "LOG_OUT" });
  }, [dispatch]);
  return (
    <Header handleSignOut={handleSignOut} isAuth={isAuth} username={username} />
  );
};

export default HeaderContainer;
