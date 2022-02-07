import React, { useCallback } from "react";
import s from "./../Modal.module.scss";
import style from "./ModalAccept.module.scss";

const ModalAccept = (props) => {
  const handleOkButton = () => {
    props.handleClickOk();
  };

  return (
    <div className={s.modal}>
      <div className={s.modalDialog}>
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
            <button className='black_button' onClick={handleOkButton}>
              Ok
            </button>
            <button className='white_button' onClick={props.handleOpenClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAccept;
