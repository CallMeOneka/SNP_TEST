import React, { useCallback } from "react";
import s from "./../Modal.module.scss";
import style from "./ModalAccept.module.scss";

const ModalAccept = (props) => {
  return (
    <div className={s.modal} onClick={props.handleOpenClose}>
      <div className={s.modalDialog} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <p className={s.modalTitle}>
            Do you want to {props.deleteBool ? "delete" : "save"}?
          </p>
          <span className={s.modalClose} onClick={props.handleOpenClose}>
            &times;
          </span>
        </div>
        <div className={s.modalContent}>
          <div className={style.acceptButtons}>
            <button className="black_button" onClick={props.handleClickOk}>
              Ok
            </button>
            <button className="white_button" onClick={props.handleOpenClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAccept;
