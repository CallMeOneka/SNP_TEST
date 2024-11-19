import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  testList: [],
  isFetching: false,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    LOAD_TEST_LIST: (state, action) => {
      state.testList = action.payload;
      state.error = action.payload;
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
  },
});

export const {
  LOAD_TEST_LIST,
  LOAD_TEST_LIST_ERROR,
  EMPTY_ERROR,
  CHANGE_FETCHING,
} = testSlice.actions;

export default testSlice.reducer;
