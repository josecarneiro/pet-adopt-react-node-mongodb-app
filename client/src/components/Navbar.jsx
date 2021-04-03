import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({ user, onSignOut }) => {
  return (
    <nav className="navbar">
      <Link to="/">
        <strong>PetPals</strong>
      </Link>
      {user && (
        <>
          {user.role === 'shelter' && <Link to="/pet/create">Create Pet</Link>}
          {user.role === 'individual' && <Link to="/pet/random">Pick Pet</Link>}
        </>
      )}
      <div>
        {(user && (
          <>
            {user.profilePicture && (
              <img src={user.profilePicture} alt={user.name} />
            )}
            <Link to={`/${user.role}/${user._id}`}>{user.name}</Link>
            {user.role === 'individual' && (
              <Link to="/preferences">Preferences</Link>
            )}
            <button onClick={onSignOut}>Sign Out</button>
          </>
        )) || (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
