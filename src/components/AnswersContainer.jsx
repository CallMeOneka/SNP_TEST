import React from "react";
import Answers from "./TestEdit/Question/Answers/Answers";
import { useDispatch, useSelector } from "react-redux";
import { openClose } from "../redux/reducers/modalReducer";
import { useCallback } from "react";
import { selectRightAnswers } from "./../redux/selectors/testListSelector";

const AnswersContainer = (props) => {
  const dispatch = useDispatch();

  const rightsCount = useSelector((state) =>
    selectRightAnswers(state, props.question_id)
  );

  const handleOpenAcceptDelete = useCallback(
    (id) => {
      dispatch(
        openClose({
          type: "accept",
          id: id,
          deleteType: "ANSWER",
          delete: true,
        })
      );
    },
    [dispatch]
  );

  const handleOpenAcceptSave = useCallback(
    (id, text, isRight) => {
      dispatch(
        openClose({
          type: "accept",
          deleteType: "ANSWER",
          id: id,
          title: text,
          delete: false,
          is_right: isRight,
        })
      );
    },
    [dispatch]
  );

  const onDragEnd = useCallback((id, position, source) => {
    dispatch({ type: "MOVE_ANSWER", id, position, source });
  });

  const addAnswer = useCallback(
    (text, is_right) => {
      dispatch({
        type: "ADD_ANSWER",
        text,
        is_right,
        question_id: props.question_id,
      });
    },
    [dispatch, props.question_id]
  );

  return (
    <Answers
      type={props.type}
      answers={props.answers}
      addAnswer={addAnswer}
      rightsCount={rightsCount}
      question_id={props.question_id}
      handleOpenAcceptSave={handleOpenAcceptSave}
      handleOpenAcceptDelete={handleOpenAcceptDelete}
      onDragEnd={onDragEnd}
    />
  );
};

export default React.memo(AnswersContainer);
