import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError } from "../redux/selectors/authSelector";
import Login from "./Login/Login";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleSubmitSignIn = useCallback(
    (username, password) => {
      dispatch({
        type: "LOG_IN",
        payload: { username, password },
      });
    },
    [dispatch]
  );
  return <Login handleSubmitSignIn={handleSubmitSignIn} error={error} />;
};

export default LoginContainer;
