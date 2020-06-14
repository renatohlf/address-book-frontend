import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import logo from "./../../assets/book-blue.svg";
import auth from "./../../services/auth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Login() {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);
    auth
      .login({ ...data })
      .then(() => {
        setLoading(false);
        history.push(`/contacts`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="login__container">
      {loading && <LoadingSpinner />}
      <div className="login__content">
        <div className="login__form">
          <img src={logo} className="login__logo" alt="logo" />
          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <input
              ref={register({ required: true })}
              className="input-field"
              type="text"
              placeholder="Username"
              name="username"
            />
            {errors.username && <span>Username is required</span>}

            <input
              ref={register({ required: true })}
              className="input-field"
              type="password"
              placeholder="Password"
              name="password"
            />
            {errors.password && <span>Password is required</span>}

            <button className="button-submit" type="submit">
              Login
            </button>
          </form>
        </div>
        <Link className="link" to="/users/new">
          <FiUserPlus size={22} color={"fff"} />
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
