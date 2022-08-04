import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Input, WrapperForm, Label, Button } from './ContactsForm.styled';

export class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.onSubmit(this.state);

    this.reset();
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { name, number } = this.state;

    return (
      <WrapperForm onSubmit={this.handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <div>
            <Input
              id={nanoid()}
              onChange={this.handleChange}
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
                onChange={this.handleChange}
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
}
