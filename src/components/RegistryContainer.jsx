import React, { useCallback } from "react";
import Registry from "./Registry/Registry";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError } from "../redux/selectors/authSelector";

const RegistryContainer = () => {
  const dispatch = useDispatch();
  let error = useSelector(selectAuthError);

  const handleSubmitSignUp = useCallback(
    (username, password, password_confirmation, is_admin) => {
      dispatch({
        type: "SIGN_UP",
        payload: { username, password, password_confirmation, is_admin },
      });
    },
    [dispatch]
  );

  return <Registry handleSubmitSignUp={handleSubmitSignUp} error={error} />;
};

export default RegistryContainer;
