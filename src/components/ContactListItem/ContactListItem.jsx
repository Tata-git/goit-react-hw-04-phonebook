import PropTypes from 'prop-types';
import { Contact, Item, Button } from './ContactListItem.styled';

export const ContactListItem = ({ name, number, onDelete }) => {
  return (
    <Item>
      <Contact>{name}: </Contact>
      <Contact>{number} </Contact>
      <Button type="button" onClick={onDelete}>
        Delete
      </Button>
    </Item>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
