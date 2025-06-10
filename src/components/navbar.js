import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from './store/authslice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser());
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-light" to="/">Medical Store</NavLink>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>"nav-link" + (isActive ? " text-warning" : " text-light")}

              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/medicinelist"
                className={({ isActive }) =>"nav-link" + (isActive ? " text-warning" : " text-light")}
              >
                Medicines
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => "btn btn-primary text-light" + (isActive ? " fw-bold text-warning" : "")}
                  >
                    login
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
