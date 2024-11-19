import React, { useCallback, useState } from "react";
import editImg from "./../../../assets/editing.png";
import style from "./Question.module.scss";
import AnswersContainer from "../../AnswersContainer";
import { useDispatch } from "react-redux";
const Question = (props) => {
  const dispatch = useDispatch();

  const [inputTitle, setTitle] = useState(props.title);
  const [inputAnswer, setAnswer] = useState(props.answer);
  const [inputType, setType] = useState(props.question_type);
  const [openQuestion, setOpenQuestion] = useState(false);

  const handleTitleInput = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const handleAnswerInput = useCallback(
    (e) => {
      setAnswer(e.target.value);
    },
    [setAnswer]
  );
  const handleTypeInput = useCallback(
    (e) => {
      setType(e.target.value);
    },
    [setType]
  );

  const handleCancelQuestion = useCallback(() => {
    setType(props.question_type);
    setTitle(props.title);
    setAnswer(props.answer);
    setOpenQuestion(false);
  }, [setTitle, setType, setAnswer, setOpenQuestion]);

  const handleSaveQuestion = useCallback(
    (e) => {
      e.preventDefault();
      props.handleOpenAcceptSave(
        "QUESTION",
        props.id,
        inputTitle,
        inputType,
        inputAnswer
      );
      setOpenQuestion(false);
    },
    [dispatch, props.id, inputTitle, inputType, inputAnswer, setOpenQuestion]
  );

  const handleAddClick = useCallback(() => {
    setOpenQuestion(true);
  }, [setOpenQuestion]);

  const handleOpenAcceptDelete = useCallback(() => {
    props.handleOpenAcceptDelete("QUESTION", props.id);
  }, [props.handleOpenAcceptDelete, props.id]);

  return (
    <li className={style.questionItem}>
      <div className={style.qustionTitle}>
        <p>{props.title}</p>
        <img
          src={editImg}
          onClick={handleAddClick}
          alt=''
          className={style.questionImage}
        />
        <span className={style.questionDelete} onClick={handleOpenAcceptDelete}>
          &times;
        </span>
      </div>

      {openQuestion ? (
        <form className={style.questionEdit}>
          <label htmlFor='question_title'>Title</label>
          <input
            type='text'
            id='question_title'
            value={inputTitle}
            onChange={handleTitleInput}
          />
          <label htmlFor=''>Type</label>
          <select value={inputType} onChange={handleTypeInput}>
            <option value='single'>Single</option>
            <option value='multiple'>Multiple</option>
            <option value='number'>Number</option>
          </select>
          <label htmlFor='question_answer'>Answer</label>
          {inputType != "number" ? (
            <AnswersContainer
              type={inputType}
              answers={props.answers}
              question_id={props.id}
            />
          ) : (
            <input
              type='text'
              id='question_answer'
              onChange={handleAnswerInput}
              value={inputAnswer}
            />
          )}
          {inputType === "number" && inputAnswer && inputTitle ? (
            <div className={style.testButtons}>
              <button className='black_button' onClick={handleSaveQuestion}>
                Save
              </button>
              <button className='white_button' onClick={handleCancelQuestion}>
                Cancel
              </button>
            </div>
          ) : inputType != "number" && props.answers.length >= 2 ? (
            <div className={style.testButtons}>
              <button className='black_button' onSubmit={handleSaveQuestion}>
                Save
              </button>
              <button className='white_button' onClick={handleCancelQuestion}>
                Cancel
              </button>
            </div>
          ) : (
            <p>
              All fields must be required and the number of answers must be more
              than two
            </p>
          )}
        </form>
      ) : (
        ""
      )}
    </li>
  );
};

export default React.memo(Question);
