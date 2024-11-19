import React from "react";
import { Link } from "react-router-dom";
import editImg from "./../../../assets/editing.png";
import style from "./Test.module.scss";

const Test = (props) => {
  return (
    <li className={style.test}>
      <Link to={"/testpass/" + props.id}>{props.title}</Link>
      {props.isAdmin ? (
        <Link to={"/testedit/" + props.id}>
          <img className={style.editLink} src={editImg} alt="editing" />
        </Link>
      ) : (
        ""
      )}
    </li>
  );
};

export default React.memo(Test);
