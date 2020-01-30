import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  //Now we'll have access to any state associated with this context.
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>PLease Add a contact</h4>;
  }
  return (
    //If the filtered is empty, it displays the full array or else it displays the filtered array.
    <div>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </div>
  );
};

export default Contacts;
