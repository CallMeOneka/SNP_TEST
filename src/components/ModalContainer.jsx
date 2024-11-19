import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openClose } from "../redux/reducers/modalReducer";
import Modal from "./Modal/Modal";
import {
  selectModalType,
  selectVisible,
} from "./../redux/selectors/modalSelector";
import { useSelector } from "react-redux";

const ModalContainer = () => {
  const visible = useSelector(selectVisible);
  const modalType = useSelector(selectModalType);
  const dispatch = useDispatch();
  let handleOpenClose = useCallback(() => {
    dispatch(openClose());
  }, [dispatch]);
  return (
    <Modal
      handleOpenClose={handleOpenClose}
      visible={visible}
      modalType={modalType}
    />
  );
};

export default ModalContainer;
