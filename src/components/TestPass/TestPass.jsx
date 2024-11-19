import React from "react";
import style from "./TestPass.module.scss";

const TestPass = (props) => {
  const handleSubmitTest = (e) => {
    e.preventDefault();

    const answers = [];

    for (let i = 0; i < e.target.elements.length - 1; i++) {
      e.target.elements[i].type === "text"
        ? answers.push({
            type: "text",
            question_id: e.target.elements[i].id,
            answer: e.target.elements[i].value,
          })
        : answers.push({
            type: "multi",
            id: e.target.elements[i].id,
            answer: e.target.elements[i].checked,
            question_id: e.target.elements[i].name,
          });
    }

    props.checkingRightAnswers(answers);
  };

  return (
    <div className={style.container}>
      <p className={style.title}>Test title: {props.test.title}</p>
      <form className={style.form} onSubmit={handleSubmitTest}>
        {props.test.questions.map((question) => {
          return (
            <div className={style.question} key={question.id}>
              <p className={style.questionTitle}>{question.title}</p>
              {question.question_type === "number" ? (
                <div className={style.question}>
                  <label className={style.answer__title} htmlFor={question.id}>
                    Answer
                  </label>
                  <input type='text' name='' id={question.id} required />
                </div>
              ) : (
                question.answers.map((answer) => {
                  return (
                    <div className={style.multyAnswer} key={answer.id}>
                      <input
                        type={
                          question.question_type == "single"
                            ? "radio"
                            : "checkbox"
                        }
                        name={question.id}
                        id={answer.id}
                        required
                      />
                      <label className={style.question_title}>
                        {answer.text}
                      </label>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}

        <button type='submit' className='black_button'>
          Finish test
        </button>
      </form>
    </div>
  );
};

export default React.memo(TestPass);
