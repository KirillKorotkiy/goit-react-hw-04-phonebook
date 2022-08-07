import React from 'react';
import { Container, ContainerTitle } from 'components/App.styled';
import ContactsForm from './form/ContactsForm';
import { nanoid } from 'nanoid';
import Filter from './filter/Filter';
import ContactsList from './contacts-list/ContactsList';
import { useState, useEffect } from 'react';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already exist`);
    } else {
      setContacts([newContact, ...contacts]);
    }
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVissibleContacts = () => {
    const normalaizedFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizedFilter)
    );
    return filterContacts;
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <ContainerTitle>Phonebook</ContainerTitle>
      <ContactsForm onSubmit={onSubmitHandler} />
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList
        contacts={getVissibleContacts()}
        name={contacts.name}
        number={contacts.number}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};

export default App;

