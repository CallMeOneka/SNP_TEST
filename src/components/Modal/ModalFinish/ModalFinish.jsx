import React from "react";
import s from "./../Modal.module.scss";
import style from "./ModalFinish.module.scss";
import { Link } from "react-router-dom";

const ModalFinish = (props) => {
  return (
    <div className={s.modal} onClick={props.handleOpenClose}>
      <div className={s.modalDialog} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <p>Test is finished</p>
          <span className={s.modalClose} onClick={props.handleOpenClose}>
            &times;
          </span>
        </div>
        <div className={s.modalContent}>
          <p>Number of correct answers: {props.rights_count}</p>
          <Link
            className={`white_button ${style.link__button}`}
            to='/?search=&page=1&sort=created_at_desc'
            onClick={props.handleOpenClose}>
            Back to testlist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalFinish;
