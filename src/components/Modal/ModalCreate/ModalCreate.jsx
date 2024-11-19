import React from "react";
import s from "./../Modal.module.scss";
import style from "./ModalCreate.module.scss";

const ModalCreate = (props) => {
  return (
    <div className={s.modal}>
      <div className={s.modalDialog}>
        <div className={s.modalHeader}>
          <p className={s.modalTitle}>CreateTest</p>
          <span className={s.modalClose} onClick={props.handleOpenClose}>
            &times;
          </span>
        </div>
        <div className={s.modalContent}></div>
      </div>
    </div>
  );
};

export default ModalCreate;
