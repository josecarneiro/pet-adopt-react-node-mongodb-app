import { Link } from 'react-router-dom';
import PetItem from './PetItem';

const PetList = ({ pets }) => {
  return (
    <div className="pet__list">
      {pets.map(pet => (
        <Link key={pet._id} to={`/pet/${pet._id}`}>
          <PetItem pet={pet} />
        </Link>
      ))}
    </div>
  );
};

export default PetList;
