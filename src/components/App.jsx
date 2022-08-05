import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

import { Title, Wrapper } from './App.styled';

//  [
//    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//  ];

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    // console.log('useName');
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalizedName = name.toLowerCase();

    const duplicate = contacts.find(
      // ({ name }) => name.toLowerCase() === normalizedName
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (duplicate) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts(prevState => [contact, ...prevState]);
    }
  };

  const updateFilter = e => setFilter(e.currentTarget.value);

  const viewContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    console.log(contactId);
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactsForm onSubmit={addContact} />
      <Title>Contacts</Title>
      <Filter onChange={updateFilter} value={filter} />
      <ContactsList contacts={viewContact()} onDeleteContact={deleteContact} />
    </Wrapper>
  );
}
