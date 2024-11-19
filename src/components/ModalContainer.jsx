import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { openClose } from "../redux/reducers/modalReducer";
import Modal from "./Modal/Modal";
import {
  selectDelete,
  selectDeleteId,
  selectDeleteType,
  selectModalInfo,
  selectModalType,
  selectVisible,
} from "./../redux/selectors/modalSelector";
import { useSelector } from "react-redux";
import { selectFinishRights } from "./../redux/selectors/testListSelector";

const ModalContainer = () => {
  const visible = useSelector(selectVisible);
  const modalType = useSelector(selectModalType);
  const deleteBool = useSelector(selectDelete);
  const information = useSelector(selectModalInfo);
  const rights_count = useSelector(selectFinishRights);

  const [title, setTitle] = useState("");

  const handleChangeTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const dispatch = useDispatch();

  const handleCreateTest = useCallback(() => {
    dispatch({ type: "CREATE_TEST", payload: { title: title } });
    setTitle("");
    dispatch(openClose({ type: "accept" }));
  }, [dispatch, title]);

  const handleOpenClose = useCallback(() => {
    dispatch(openClose({ type: "accept" }));
  }, [dispatch]);

  const handleClickOk = useCallback(() => {
    if (information.deleteType === "TEST" && information.deleteBool) {
      dispatch({ type: "DELETE_TEST", id: information.id });
    } else if (
      information.deleteType === "QUESTION" &&
      information.deleteBool
    ) {
      dispatch({ type: "DELETE_QUESTION", id: information.id });
    } else if (information.deleteType === "ANSWER" && information.deleteBool) {
      dispatch({ type: "DELETE_ANSWER", id: information.id });
    } else if (information.deleteType === "TEST" && !information.deleteBool) {
      dispatch({
        type: "EDIT_TEST",
        id: information.id,
        title: information.title,
      });
    } else if (
      information.deleteType === "QUESTION" &&
      !information.deleteBool
    ) {
      dispatch({
        type: "EDIT_QUESTION",
        question_id: information.id,
        title: information.title,
        answer: information.answer,
        question_type: information.question_type,
      });
    } else if (information.deleteType === "ANSWER" && !information.deleteBool) {
      dispatch({
        type: "EDIT_ANSWER",
        text: information.title,
        is_right: information.is_right,
        id: information.id,
      });
    }

    dispatch(openClose({ type: "accept" }));
  }, [dispatch, information]);

  return (
    <Modal
      handleOpenClose={handleOpenClose}
      visible={visible}
      modalType={modalType}
      title={title}
      handleChangeTitle={handleChangeTitle}
      handleCreateTest={handleCreateTest}
      deleteBool={deleteBool}
      rights_count={rights_count}
      handleClickOk={handleClickOk}
    />
  );
};

export default ModalContainer;
