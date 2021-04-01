import './PetItem.scss';

import { getHumanReadableGender } from './../common';

// const getHumanReadableGender = gender =>
//   ({ male: 'Male', female: 'Female' }[gender]);

const PetItem = ({ pet, size = 'medium' }) => {
  return (
    <div className={`pet__item pet__item--${size}`}>
      {(!!pet.pictures.length && (
        <img src={pet.pictures[0]} alt={pet.name} />
      )) || <div className="pet__standin-picture"></div>}
      <div className="pet__item__details">
        <h5>{pet.name}</h5>
        <small>
          {pet.breed} | {pet.age} Years Old |{' '}
          {getHumanReadableGender(pet.gender)}
        </small>
        {size === 'large' && pet.description && <p>{pet.description}</p>}
      </div>
    </div>
  );
};

export default PetItem;
