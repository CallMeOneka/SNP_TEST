import React, { useState } from "react";
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
        <div className={s.modalContent}>
          <input
            type='text'
            value={props.title}
            onChange={props.handleChangeTitle}
          />
          <div className={style.acceptButtons}>
            {props.title ? (
              <button className='black_button' onClick={props.handleCreateTest}>
                Ok
              </button>
            ) : (
              ""
            )}

            <button className='white_button' onClick={props.handleOpenClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
