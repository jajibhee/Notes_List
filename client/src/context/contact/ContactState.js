import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jaji Bhee",
        email: "tobi@kobo360.com",
        phone: 111 - 111 - 222,
        type: "personal"
      },
      {
        id: 2,
        name: "Jojo Bhee",
        email: "tobi@kobo360.com",
        phone: 111 - 111 - 222,
        type: "personal"
      },
      {
        id: 3,
        name: "Seyikemi Bhee",
        email: "tobi@kobo360.com",
        phone: 111 - 111 - 222,
        type: "professional"
      }
    ],
    current: null,
    filtered: null
  };

  //dispatch allows us dispatch objects to the reducer.
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set Current Contact that will be cleared
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: SET_CURRENT });
  };

  //Update CONTACT
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //Filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
