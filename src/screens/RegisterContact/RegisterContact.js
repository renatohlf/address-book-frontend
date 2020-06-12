import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'; 
import api from "./../../services/api";
import { getAuthToken, getUserEmail } from "../../utils/auth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";


function RegisterContact() {
  const { register, handleSubmit } = useForm(); // initialise the hook
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);
    api
      .post("contact", { ...data }, { headers: { Authorization: getAuthToken(), userEmail: getUserEmail() } })
      .then((res) => {
        setLoading(false);
        history.push(`/contacts`);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  return (
      <div className="register-contact__container">

        {loading && <LoadingSpinner />}
        <div className="register-contact__content">
            <h2>New contact</h2>
            <form
            className="register-contact__form"
            onSubmit={handleSubmit(onSubmit)}
            >
            <input
                ref={register()}
                className="input-field"
                type="text"
                placeholder="First Name"
                name="firstName"
            />

            <input
                ref={register()}
                className="input-field"
                type="text"
                placeholder="Last Name"
                name="lastName"
            />

            <input
                ref={register()}
                className="input-field"
                type="text"
                placeholder="Email"
                name="email"
            />

            <input
                ref={register()}
                className="input-field"
                type="text"
                placeholder="Phone"
                name="phone"
            />

            <button
                className="button-submit"
                type="submit"
            >
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
