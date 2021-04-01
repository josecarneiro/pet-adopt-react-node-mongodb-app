import './CheckboxGroup.scss';

const CheckboxGroup = ({ options, values, onUpdate }) => {
  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    if (checked) {
      onUpdate([...values, name]);
    } else {
      onUpdate(values.filter(value => value !== name));
    }
  };

  return (
    <div className="input--checkbox-group">
      {options.map(option => (
        <div>
          <input
            id={`input-checkbox-${option.value}`}
            type="checkbox"
            name={option.value}
            checked={values.includes(option.value)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`input-checkbox-${option.value}`}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
