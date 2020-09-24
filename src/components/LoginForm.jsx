import React from "react";


const LoginForm = ({ login }) => {
  return (
    <form onSubmit={login} data-cy="login-form">

      <input
        label='Email'
        placeholder='Email'
        name="email"
        type="email"
        id="email"
        data-cy="login-email"
      />

      <input
        label='Password'
        placeholder='Password'
        name="password"
        type="password"
        id="password"
        data-cy="login-password"
      />

      <button type='submit' data-cy="login-submit">Submit</button>
    </form>
  );
};

export default LoginForm;