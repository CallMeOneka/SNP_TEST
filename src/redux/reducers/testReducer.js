import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  testList: [],
  isFetching: false,
  currentTest: {
    questions: [],
  },
  currentPage: 1,
  total_count: 0,
  total_pages: 2,
  rights_count: 0,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    LOAD_TEST_LIST: (state, action) => {
      state.testList = action.payload;
      state.error = "";
    },
    SET_TOTAL: (state, action) => {
      state.total_count = action.payload.total_count;
      state.total_pages = action.payload.total_pages;
    },
    SET_CURRENT_PAGE: (state, action) => {
      state.currentPage = Number(action.payload);
    },
    LOAD_TEST_LIST_ERROR: (state, action) => {
      state.error = action.payload;
    },
    EMPTY_ERROR: (state) => {
      state.error = "";
    },
    CHANGE_FETCHING: (state) => {
      state.isFetching = !state.isFetching;
    },
    GET_CURRENT_TEST: (state, action) => {
      state.currentTest = action.payload;
    },
    CREATE_QUESTION: (state, action) => {
      state.currentTest.questions.push(action.payload);
    },
    EDIT_QUESTION: (state, action) => {
      state.currentTest.questions.forEach((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.question_type = action.payload.question_type;
          item.answer = action.payload.answer;
        }
      });
    },
    DELETE_QUESTION: (state, action) => {
      state.currentTest.questions.forEach((item, index) => {
        if (item.id === action.payload.id) {
          state.currentTest.questions.splice(index, 1);
        }
      });
    },
    ADD_ANSWER: (state, action) => {
      state.currentTest.questions.forEach((item) => {
        if (item.id === action.question_id) {
          item.answers.push(action.payload);
        }
      });
    },
    EDIT_ANSWER: (state, action) => {
      state.currentTest.questions.forEach((item) => {
        item.answers.forEach((answer) => {
          if (answer.id === action.payload.id) {
            answer.text = action.payload.text;
            answer.is_right = action.payload.is_right;
          }
        });
      });
    },
    DELETE_ANSWER: (state, action) => {
      state.currentTest.questions.forEach((item) => {
        item.answers.forEach((answer, answer_index) => {
          if (answer.id === action.payload.id) {
            item.answers.splice(answer_index, 1);
          }
        });
      });
    },
    MOVE_ANSWER: (state, action) => {
      let arrIndex = null;
      state.currentTest.questions.forEach((item, index) => {
        if (item.id === Number(action.payload.source.droppableId)) {
          arrIndex = index;
        }
      });
      console.log(arrIndex);
      const result = Array.from(
        current(state.currentTest.questions[arrIndex].answers)
      );
      const [removed] = result.splice(action.payload.source.index, 1);
      result.splice(action.payload.position.index, 0, removed);
      state.currentTest.questions[arrIndex].answers = result;
    },
    ADD_USER_CHECK: (state, action) => {
      console.log(action.payload);
      let rights_count = 0;
      action.payload.forEach((answer) => {
        if (answer.type === "text") {
          state.currentTest.questions.forEach((question) => {
            if (
              question.id === Number(answer.question_id) &&
              question.answer === Number(answer.answer)
            ) {
              rights_count++;
            }
          });
        } else {
          state.currentTest.questions.forEach((question) => {
            if (question.id === Number(answer.question_id)) {
              question.answers.forEach((right_answer) => {
                if (
                  right_answer.id === Number(answer.id) &&
                  right_answer.is_right === answer.answer &&
                  answer.answer
                ) {
                  rights_count++;
                }
              });
            }
          });
        }
      });

      state.rights_count = rights_count;
    },
  },
});

export const {
  LOAD_TEST_LIST,
  SET_CURRENT_PAGE,
  SET_TOTAL,
  LOAD_TEST_LIST_ERROR,
  EMPTY_ERROR,
  CHANGE_FETCHING,
  GET_CURRENT_TEST,
  CREATE_QUESTION,
  EDIT_QUESTION,
  DELETE_QUESTION,
  ADD_ANSWER,
  DELETE_ANSWER,
  EDIT_ANSWER,
  MOVE_ANSWER,
  ADD_USER_CHECK,
} = testSlice.actions;

export default testSlice.reducer;
