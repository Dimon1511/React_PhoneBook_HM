import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import {
  getAllContactsService,
  createContactService,
  deleteContactService,
} from "./services/contactsService";

function initTask() {
  const contacts = localStorage.getItem("contacts");
  if (contacts) {
    return JSON.parse(contacts);
  } else {
    return [];
  }
}

function App() {
  const [contacts, setContacts] = useState(initTask);
  const [filter, setFilter] = useState("");

  function createContact(name, number) {
    createContactService({
      name,
      number,
    }).then((newContact) => {
      setContacts((prev) => [...prev, newContact]);
    });
  }

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }),
    [contacts];

  useEffect(() => {
    getAllContactsService().then((data) => {
      setContacts(data);
    });
  }, []);

  function addContact(name, number) {
    const newContact = {
      name: name,
      id: nanoid(),
      number: +number,
    };

    const existingContact = contacts.find(
      (contact) => contact.name === newContact.name
    );

    if (existingContact) {
      alert(existingContact.name + " is already exists!");
      return;
    }

    setContacts((prevContacts) => [newContact, ...prevContacts]);
    console.log(newContact);
  }

  function deleteContact(contactId) {
    deleteContactService(contactId).then(() => {
      setContacts((prev) =>
        prev.filter((contact) => {
          return contact.id !== contactId;
        })
      );
    });
  }

  function checkContact(name) {
    setContacts((contact) => {
      if (contact.name === name) {
        alert(contact.name + "is already used");
      }
    });
  }

  const filteredContacts = contacts.filter((contact) => {
    if (contact.name.includes(filter)) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className={styles.container}>
      <h2>Phonebook</h2>
      <ContactForm onAddContact={createContact} />
      <h2>Contacts</h2>
      <div className={styles.contactsSection}>
        <Filter onFilterChange={setFilter} filterValue={filter} />
        {filteredContacts.length !== 0 && (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        )}
      </div>
    </div>
  );
}

export default App;
