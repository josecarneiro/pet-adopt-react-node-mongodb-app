import './PetItem.scss';

// const getHumanReadableGender = gender =>
//   ({ male: 'Male', female: 'Female' }[gender]);

const getHumanReadableGender = gender => {
  const genderMap = { male: 'Male', female: 'Female' };
  const humanReadableFormat = genderMap[gender];
  return humanReadableFormat;
};

const PetItem = ({ pet }) => {
  return (
    <div className="pet__item">
      {/* <img
        src={`https://source.unsplash.com/5PVXkqt2s9k/600x800`}
        alt={pet.name}
      /> */}
      {(!!pet.pictures.length && (
        <img src={pet.pictures[0]} alt={pet.name} />
      )) || <div className="pet__standin-picture"></div>}
      <div className="pet__item__details">
        <h5>{pet.name}</h5>
        <small>
          {pet.breed} | {pet.age} Years Old |{' '}
          {getHumanReadableGender(pet.gender)}
        </small>
      </div>
    </div>
  );
};

export default PetItem;
