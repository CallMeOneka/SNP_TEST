import React from "react";
import TestPass from "./TestPass";
import { useSelector } from "react-redux";
import { selectCurrentTest } from "../redux/selectors/testListSelector";
import { useDispatch } from "react-redux";
import { ADD_USER_CHECK } from "../redux/reducers/testReducer";
import { openClose } from "../redux/reducers/modalReducer";

const TestPassContainer = () => {
  const dispatch = useDispatch();
  const current_test = useSelector(selectCurrentTest);

  const checkingRightAnswers = (answers) => {
    dispatch(ADD_USER_CHECK(answers));
    dispatch(openClose({ type: "finish_test" }));
  };

  return (
    <TestPass test={current_test} checkingRightAnswers={checkingRightAnswers} />
  );
};

export default TestPassContainer;
