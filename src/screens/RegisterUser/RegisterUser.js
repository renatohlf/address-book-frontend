import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function RegisterContact() {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);
    api
      .post("register", { ...data })
      .then((res) => {
        setLoading(false);
        history.push(`/`);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  return (
    <div className="register-user__container">
      {loading && <LoadingSpinner />}
      <div className="register-user__content">
        <h2>Sign up</h2>
        <form className="register-user__form" onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={register({ required: true })}
            className="input-field"
            type="text"
            placeholder="Name"
            name="name"
          />
          {errors.name && "Name is required."}

          <input
            ref={register({ required: true })}
            className="input-field"
            type="text"
            placeholder="Email"
            name="email"
          />
          {errors.email && "Email is required."}

          <input
            ref={register({ required: true })}
            className="input-field"
            type="password"
            placeholder="Password"
            name="password"
          />
          {errors.password && "Password is required."}

          <button className="button-submit" type="submit">
            Register
          </button>
        </form>
        <Link className="link" to="/contacts">
          <FiArrowLeft size={22} color={"fff"} />
          Back
        </Link>
      </div>
    </div>
  );
}

export default RegisterContact;
