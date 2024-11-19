import React, { useCallback, useEffect } from "react";
import s from "./Modal.module.scss";
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

  if (!props.visible) return null;
};

export default React.memo(Modal);
