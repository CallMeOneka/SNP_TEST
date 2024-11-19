import React, { useCallback, useState } from "react";
import TestEdit from "./TestEdit/TestEdit";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentTest,
  selectTestFetching,
} from "../redux/selectors/testListSelector";
import { openClose } from "../redux/reducers/modalReducer";

const TestEditContainer = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const current_test = useSelector(selectCurrentTest);
  const isFetching = useSelector(selectTestFetching);

  const [visible, setVisible] = useState(false);

  const openQuestion = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const closeQuestion = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleCreateQuestion = useCallback(
    (title, question_type, answer) => {
      dispatch({
        type: "CREATE_QUESTION",
        test_id: params.testId,
        title: title,
        question_type: question_type,
        answer: answer,
      });
    },
    [dispatch, params.testId]
  );

  const handleOpenAcceptSave = useCallback(
    (deleteType, id, title, question_type, answer) => {
      dispatch(
        openClose({
          type: "accept",
          id: id,
          deleteType: deleteType,
          delete: false,
          title: title,
          question_type: question_type,
          answer: answer,
        })
      );
    },
    [dispatch]
  );

  const handleOpenAcceptDelete = useCallback(
    (deleteType, id) => {
      dispatch(
        openClose({
          type: "accept",
          id: id,
          deleteType: deleteType,
          delete: true,
        })
      );
    },
    [dispatch]
  );

  return (
    <TestEdit
      test={current_test}
      visible={visible}
      openQuestion={openQuestion}
      isFetching={isFetching}
      closeQuestion={closeQuestion}
      handleCreateQuestion={handleCreateQuestion}
      handleOpenAcceptDelete={handleOpenAcceptDelete}
      handleOpenAcceptSave={handleOpenAcceptSave}
    />
  );
};

export default TestEditContainer;
