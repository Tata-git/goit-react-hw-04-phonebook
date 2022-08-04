import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { Input, Label } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="name">Find contacts by name</Label>
      <div>
        <Input
          id={nanoid()}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Contact search"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
//---------------------------------------------------------------
// function Filter({ onChange, value }) {
//   return <input type="text" onChange={onChange} value={value} />;
// }
