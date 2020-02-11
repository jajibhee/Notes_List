import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { name, _id, type, email, phone } = contact;

  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h1 className="text-left text-primary">
        {name} {""}{" "}
        <span
          style={{ float: "right" }}
          className={`badge ${
            type === `professional` ? `badge-success` : `badge-primary`
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h1>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {phone}
          </li>
        )}
      </ul>
      <p>
        {/* Sets the current to the current contact grabbed from the prop of the contacts. */}
        <button className="btn-dark btn-sm" onClick={() => setCurrent(contact)}>
          Edit
        </button>
        <button className="btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
