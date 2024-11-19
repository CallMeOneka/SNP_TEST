import { createSelector } from "@reduxjs/toolkit";

export const selectTestError = (state) => state.test.error;
export const selectTestFetching = (state) => state.test.isFetching;
export const selectTestList = (state) => state.test.testList;
export const selectCurrentTest = (state) => state.test.currentTest;
export const selectPagesCount = (state) => state.test.total_pages;
export const selectCurrentPage = (state) => state.test.currentPage;
export const selectFinishRights = (state) => state.test.rights_count;

export const selectRightAnswers = createSelector(
  selectCurrentTest,
  (_, question_id) => question_id,
  (currentTest, question_id) => {
    let rights_count = 0;
    let current = currentTest.questions.filter(
      (item) => item.id === question_id
    );
    current[0].answers.forEach((element) => {
      if (element.is_right === true) rights_count++;
    });
    return rights_count;
  }
);
