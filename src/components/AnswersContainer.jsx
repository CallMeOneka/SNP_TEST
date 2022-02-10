import React from "react";
import Answers from "./TestEdit/Question/Answers/Answers";
import { useDispatch } from "react-redux";
import { openClose } from "../redux/reducers/modalReducer";
import { useCallback } from "react";

const AnswersContainer = (props) => {
  const dispatch = useDispatch();

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
    (id, text, is_right) => {
      dispatch(
        openClose({
          type: "accept",
          deleteType: "ANSWER",
          id: id,
          title: text,
          delete: false,
          is_right: is_right,
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
      question_id={props.question_id}
      handleOpenAcceptSave={handleOpenAcceptSave}
      handleOpenAcceptDelete={handleOpenAcceptDelete}
      onDragEnd={onDragEnd}
    />
  );
};

export default React.memo(AnswersContainer);
