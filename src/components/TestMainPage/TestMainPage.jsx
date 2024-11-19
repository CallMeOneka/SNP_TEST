import React from "react";
import { Link } from "react-router-dom";
import Fetcing from "../Fetching/Fetching";
import style from "./TestMainPage.module.scss";

const TestMainPage = (props) => {
  return (
    <div className={style.container}>
      <button className="white_button" onClick={props.handleCreateTest}>
        CREATE TEST
      </button>
      {props.isFetching ? (
        <Fetcing />
      ) : props.error ? (
        <p className={style.error}>
          {props.error}{" "}
          <Link className={style.loginLink} to="/login">
            Log in to the system
          </Link>
        </p>
      ) : (
        <div>
          <div className={style.testHeader}>
            <input type="text" />
          </div>
          <div className={style.testList}></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TestMainPage);
