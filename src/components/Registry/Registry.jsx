import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Registry.module.scss";

const Registry = (props) => {
  let [login, setLogin] = useState("");
  let handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  let [password, setPassword] = useState("");
  let handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  let [confirmPassword, setConfirmPassword] = useState("");
  let handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  let [isAdmin, setIsAdmin] = useState(false);
  let handleIsAdminCheckbox = (e) => {
    setIsAdmin(!isAdmin);
  };
  let handleSubmitForm = (e) => {
    e.preventDefault();
    props.handleSubmitSignUp(login, password, confirmPassword, isAdmin);
  };

  return (
    <div className={style.registryContainer}>
      <form className={style.registryForm} onSubmit={handleSubmitForm}>
        <h1>Sing up to the system</h1>
        {props.error ? <p className={style.error}>{props.error}</p> : <p></p>}
        <label htmlFor="login">Enter your login</label>
        <input
          type="text"
          name="login"
          id="login"
          value={login}
          onChange={handleChangeLogin}
          className={style.registryInput}
          required
        />
        <label htmlFor="registryPassword">Enter your password</label>
        <input
          type="password"
          name="registryPassword"
          id="registryPassword"
          value={password}
          onChange={handleChangePassword}
          className={style.registryPassword}
          required
        />
        {password.length < 6 && password ? (
          <p className={style.error}>
            Password too short (Minimum 6 characters)
          </p>
        ) : (
          <p></p>
        )}
        <label htmlFor="confirmPassword">Confirm your password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          className={style.registryPassword}
          required
        />
        <div className={style.adminCheckbox}>
          <input
            type="checkbox"
            name="isAdminCheckbox"
            id="isAdminCheckbox"
            value={isAdmin}
            onChange={handleIsAdminCheckbox}
          />
          <label htmlFor="isAdminCheckbox">Admin</label>
        </div>

        <Link to="/login">Log in</Link>
        <button
          type="submit"
          className={style.registryButton}
          disabled={password.length < 6 && password ? true : false}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default React.memo(Registry);
