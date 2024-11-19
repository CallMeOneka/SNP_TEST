import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import TestMainPage from "./TestMainPage";
import {
  selectTestError,
  selectTestFetching,
} from "./../redux/selectors/testListSelector";
import { useDispatch } from "react-redux";

const TestMainPageContainer = () => {
  const dispatch = useDispatch();
  const handleCreateTest = useCallback(() => {
    dispatch({ type: "CREATE_TEST", payload: { title: "" } });
  }, [dispatch]);
  const error = useSelector(selectTestError);
  const isFetching = useSelector(selectTestFetching);

  return (
    <TestMainPage
      error={error}
      handleCreateTest={handleCreateTest}
      isFetching={isFetching}
    />
  );
};

export default TestMainPageContainer;
