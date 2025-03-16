import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.avif";
import { useClerk, useUser } from '@clerk/clerk-react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'

const Header = () => {
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate()
  const { isSignedIn, user, isLoaded } = useUser();
  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null)
      localStorage.clear();
      navigate('/')
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div>
      <nav className="header d-flex justify-content-between align-content-center py-3">
        <div className="d-flex justify-content-center">
          <Link to="/">
            <img src={logo} alt="" width="60px" className="ms-4" />
          </Link>
        </div>
        <ul className="text-white d-flex justify-content-center list-unstyled">
          <li>
            <Link to="/" className="link me-4">
              Home
            </Link>
          </li>
          {!isSignedIn ? (
            <>
              <li>
                <Link to="signin" className="link me-4 ">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="signup" className="link me-4 ">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <div className="d-flex me-3">
              <div className="user-button">
                <img src={user.imageUrl} width="40px" className="rounded-circle" alt="" />
                <p className="mb-0 user-name"> {user.firstName}</p>
                {currentUser.role === 'admin' && (
                  <Link to="admin-profile" className="link me-4">
                    Admin Profile
                  </Link>
                )}
              </div>
              <button onClick={handleSignOut} className="signout-btn">
                Signout
              </button>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;