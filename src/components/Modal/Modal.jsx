import React, { useCallback, useEffect } from "react";
import ModalAccept from "./ModalAccept";
import ModalFinish from "./ModalFinish";
import ModalCreate from "./ModalCreate/ModalCreate";

const Modal = (props) => {
  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  const onKeydown = useCallback((e) => {
    if (props.visible) {
      switch (e.key) {
        case "Escape":
          props.handleOpenClose();
      }
    }
  });

  const modals = {
    accept: ModalAccept,
    finish_test: ModalFinish,
    create: ModalCreate,
  };

  if (!props.visible) return null;

  return modals[props.modalType](props);
};

export default React.memo(Modal);
