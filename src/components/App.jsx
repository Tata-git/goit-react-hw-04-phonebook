import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

import { Title, Wrapper } from './App.styled';

export default class App extends Component {
  state = {
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const valueContacts = localStorage.getItem('contacts');
    // console.log(typeof valueContacts); // string

    const parsedValueContacts = JSON.parse(valueContacts);
    // console.log(typeof parsedValueContacts); // object

    if (parsedValueContacts) {
      this.setState({ contacts: parsedValueContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    // console.log(prevState);
    // console.log(this.state);

    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const { contacts } = this.state;
    const duplicate = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  viewContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  updateFilter = e => this.setState({ filter: e.currentTarget.value });

  render() {
    const { filter } = this.state;
    const displayingContacts = this.viewContact();
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactsForm onSubmit={this.addContact} />
        <Title>Contacts</Title>
        <Filter onChange={this.updateFilter} value={filter} />
        <ContactsList
          contacts={displayingContacts}
          onDeleteContact={this.deleteContact}
        />
      </Wrapper>
    );
  }
}
