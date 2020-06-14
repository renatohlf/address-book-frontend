import React, { useEffect, useState } from "react";
import { FiUserPlus, FiLogOut } from "react-icons/fi";
import api from "../../services/api";
import { Link } from "react-router-dom";
import auth from "../../services/auth";
import { getAuthToken, getUserEmail } from "../../utils/auth";
import logo from "./../../assets/book-blue.svg";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api
      .get("contacts",{ headers: { Authorization: getAuthToken(), userEmail: getUserEmail() } })
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setContacts(res.data.contacts);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      {loading && <LoadingSpinner />}
      <div className="nav-bar">
        <img src={logo} className="contacts__logo" alt="logo" />
        <Link to="/contacts/new">
          <FiUserPlus size={22} color={"fff"} />
        </Link>

        <Link to="/" onClick={() => auth.logout()}>
          <FiLogOut
            size={22}
            color={"fff"}
            onClick={() => console.log("####")}
          />
        </Link>
      </div>

      <div className="contacts__contacts-list">
        <h2>My Contacts</h2>

        {contacts.length === 0 && <div>There is no contacts registered</div>}

        {contacts &&
          contacts.map((contact) => {
            return (
              <div className="contacts__contact-card">
                <div className="contacts__contact-card__title">{`${contact.firstName} ${contact.lastName}`}</div>
                <div className="contacts__contact-card__subtitle">
                  {contact.phone}
                </div>
                <div className="contacts__contact-card__subtitle--sm">
                  {contact.email}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Contacts;
