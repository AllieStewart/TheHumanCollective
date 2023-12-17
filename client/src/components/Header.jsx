// Start of JSX file
// Header for the web page.
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
              <img src="../rizz_logo.png" height="120" width="450"/>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info btn-login m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light btn-login m-2" onClick={logout}>
                Logout
              </button>
              <Link className="btn btn-lg btn-primary btn-faq m-2" to="/faq">
                FAQ
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info btn-login m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light btn-login m-2" to="/signup">
                Signup
              </Link>
              <Link className="btn btn-lg btn-primary btn-faq m-2" to="/faq">
                FAQ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
// End of JSX file