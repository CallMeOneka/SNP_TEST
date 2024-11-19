import React, { useState } from "react";
import { Link } from "react-router-dom";
import Fetcing from "../Fetching/Fetching";
import Test from "./Test";
import style from "./TestMainPage.module.scss";

const TestMainPage = (props) => {
  return (
    <div className={style.container}>
      <div className={style.testHeader}>
        <input
          type='text'
          className={style.testInput}
          value={props.searchParams}
          onChange={props.handleChange}
        />
        {props.isAdmin ? (
          <button className='white_button' onClick={props.handleCreateTest}>
            CREATE TEST
          </button>
        ) : (
          ""
        )}
      </div>
      <div className={style.pages}>
        <label htmlFor='sort'>Sort alphabetically</label>
        <input
          type='checkbox'
          name='sorted'
          checked={props.sort}
          id='sort'
          onChange={props.handleChangeSort}
        />
        {props.pages.map((page, index) => (
          <span
            key={index}
            className={
              props.currentPage === page ? style.selectedPage : style.page
            }
            onClick={(e) => {
              props.handleChangePage(page);
            }}>
            {page}
          </span>
        ))}
      </div>
      {props.isFetching ? (
        <Fetcing />
      ) : props.error ? (
        <p className={style.error}>
          {props.error}{" "}
          <Link className={style.loginLink} to='/login'>
            Log in to the system
          </Link>
        </p>
      ) : (
        <div>
          <ul className={style.testList}>
            {props.testList.map((test) => (
              <Test
                title={test.title}
                key={test.id}
                id={test.id}
                isAdmin={props.isAdmin}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(TestMainPage);
