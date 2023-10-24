import React from "react";
import styles from "./ContactList.module.css";
import { AnimatePresence, motion } from "framer-motion";

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.contactsList}>
      <AnimatePresence>
        {contacts.map((contact) => (
          <motion.li
            initial={{
              opacity: 0,
              x: 100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 100,
            }}
            id={contact.id}
            key={contact.id}
          >
            {contact.name} : {contact.number}
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default ContactList;
