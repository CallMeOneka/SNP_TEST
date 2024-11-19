import React, { useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import style from ".././Answers.module.scss";

const Answer = (props) => {
  const [text, setText] = useState(props.text);
  const [isRight, setRight] = useState(props.is_right);

  console.log(props.rightsCount);

  const handleClickSave = useCallback((e) => {
    e.preventDefault();
    props.handleOpenAcceptSave(props.id, text, isRight);
  });

  const handleClickDelete = useCallback(
    (e) => {
      e.preventDefault();
      props.handleOpenAcceptDelete(props.id);
    },
    [props.id, props.deleteAnswer]
  );

  const handleTextChange = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [setText]
  );

  const handleChangeRightAnswer = useCallback(() => {
    setRight(!isRight);
  }, [setRight, isRight]);

  return (
    <Draggable draggableId={String(props.id)} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className={style.addAnswer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <input type='text' value={text} onChange={handleTextChange} />
          <input
            type='checkbox'
            checked={isRight}
            onChange={handleChangeRightAnswer}
          />
          {props.rightsCount >= 1 &&
          props.type === "single" &&
          !isRight == props.is_right &&
          isRight ? (
            <span>There should be only one answer, save other answers</span>
          ) : props.rightsCount <= 1 &&
            !isRight &&
            !isRight == props.is_right ? (
            <span>There must be at least one correct answer</span>
          ) : (
            <span onClick={handleClickSave}>&#10003;</span>
          )}
          <span className={style.questionDelete} onClick={handleClickDelete}>
            &times;
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Answer);
