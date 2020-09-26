import React from "react";

const LoginForm = ({ submitFormHandler }) => {
  return (
    <>
      <form onSubmit={submitFormHandler} data-cy="login-form">
        <label>Email</label>
        <input name="email" type="email" data-cy="email"></input>
        <label>Password</label>
        <input name="password" type="password" data-cy="password"></input>
        <button data-cy="button">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
