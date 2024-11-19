import React, { useCallback, useEffect, useState } from "react";
import style from "./TestEdit.module.scss";
import Question from "./Question";
import Fetcing from "../Fetching/Fetching";

const TestEdit = (props) => {
  const [inputTitle, setTitle] = useState("");
  const [inputAnswer, setAnswer] = useState(0);
  const [inputType, setType] = useState("single");
  const [openQuestion, setOpenQuestion] = useState(false);
  const [testName, setTestName] = useState(props.test.title);

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

  const handleEditTest = useCallback(() => {
    props.handleOpenAcceptSave("TEST", props.test.id, testName);
  }, [props.handleOpenAcceptSave, testName, props.test.id]);

  const handleChangeTitle = useCallback(
    (e) => {
      setTestName(e.target.value);
    },
    [setTestName]
  );

  const handleCancelQuestion = useCallback(() => {
    setType("single");
    setTitle("");
    setAnswer(0);
    setOpenQuestion(false);
  }, [setType, setTitle, setAnswer, setOpenQuestion]);

  const handleSaveQuestion = useCallback(() => {
    props.handleCreateQuestion(inputTitle, inputType, inputAnswer);
    setType("single");
    setTitle("");
    setAnswer(0);
    setOpenQuestion(false);
  }, [
    setType,
    setTitle,
    setAnswer,
    setOpenQuestion,
    props.handleCreateQuestion,
    inputTitle,
    inputType,
    inputAnswer,
  ]);

  const handleAddClick = useCallback(() => {
    setOpenQuestion(true);
  }, [setOpenQuestion]);

  const handleOpenAcceptDelete = useCallback(() => {
    props.handleOpenAcceptDelete("TEST", props.test.id);
  }, [props.handleOpenAcceptDelete, props.test.id]);

  return props.isFetching ? (
    <Fetcing />
  ) : (
    <div className={style.container}>
      <div className={style.testName}>
        <label htmlFor='TestName' className={style.testNameLabel}>
          Test Name
        </label>
        <input
          type='text'
          name='TestName'
          id='TestName'
          className={style.testNameInput}
          value={testName}
          onChange={handleChangeTitle}
        />
        <div className={style.addButton}>
          <button className='white_button' onClick={handleAddClick}>
            Add question
          </button>
        </div>
      </div>
      <ul className={style.testBody}>
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
              <p>Save test to edit single or multiple answers</p>
            ) : (
              <input
                type='text'
                id='question_answer'
                onChange={handleAnswerInput}
                value={inputAnswer}
              />
            )}
            {(inputType === "number" && inputAnswer && inputTitle) ||
            (inputType != "number" && inputTitle) ? (
              <div className={style.testButtons}>
                <button className='black_button' onClick={handleSaveQuestion}>
                  Save
                </button>
                <button className='white_button' onClick={handleCancelQuestion}>
                  Cancel
                </button>
              </div>
            ) : (
              <span>The form fields must be filled in</span>
            )}
          </form>
        ) : (
          ""
        )}
        {props.test.questions.map((question) => (
          <Question
            handleOpenAcceptSave={props.handleOpenAcceptSave}
            title={question.title}
            key={question.id}
            rights_count={props.rights_count}
            id={question.id}
            answer={question.answer}
            answers={question.answers}
            question_type={question.question_type}
            handleEditQuestion={props.handleEditQuestion}
            handleOpenAcceptDelete={props.handleOpenAcceptDelete}
          />
        ))}
      </ul>
      <div className={style.testButtons}>
        <button className='black_button' onClick={handleEditTest}>
          Save
        </button>
        <button className='white_button' onClick={handleOpenAcceptDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default React.memo(TestEdit);
