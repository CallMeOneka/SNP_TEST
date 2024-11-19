import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isOpen: false,
  modalType: "form",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openClose: (state, action) => {
      state.isOpen = !state.isOpen;
      state.modalType = action.payload;
    },
  },
});

export const { openClose } = modalSlice.actions;

export default modalSlice.reducer;
