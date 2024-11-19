import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isOpen: false,
  modalType: "form",
  deleteType: null,
  id: null,
  deleteBool: false,
  title: null,
  question_type: null,
  answer: null,
  is_right: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openClose: (state, action) => {
      state.isOpen = !state.isOpen;
      state.modalType = action.payload.type;
      state.id = action.payload.id;
      state.deleteType = action.payload.deleteType;
      state.deleteBool = action.payload.delete;
      if (!state.delete) {
        state.question_type = action.payload.question_type;
        state.title = action.payload.title;
        state.answer = action.payload.answer;
        state.is_right = action.payload.is_right;
      }
    },
  },
});

export const { openClose } = modalSlice.actions;

export default modalSlice.reducer;
