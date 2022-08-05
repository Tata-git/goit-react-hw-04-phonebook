import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Input, WrapperForm, Label, Button } from './ContactsForm.styled';

export function ContactsForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    console.log(name, value);

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <div>
          <Input
            id={nanoid()}
            onChange={handleChange}
            value={name}
            name="name"
            type="text"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
          />
        </div>
        <div>
          <Label htmlFor="number">Number</Label>
          <div>
            <Input
              id={nanoid()}
              onChange={handleChange}
              value={number}
              name="number"
              type="tel"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              placeholder="Enter number"
            />
          </div>
        </div>
      </div>
      <Button type="submit">Add contact</Button>
    </WrapperForm>
  );
}

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
