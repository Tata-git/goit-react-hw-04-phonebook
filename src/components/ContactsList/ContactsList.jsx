import PropTypes from 'prop-types';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import { ContactList } from './ContactList.styled';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ContactList>
      {contacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          onDelete={() => {
            onDeleteContact(id);
          }}
        />
      ))}
    </ContactList>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
