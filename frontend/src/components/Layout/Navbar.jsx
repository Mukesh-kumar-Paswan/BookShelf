import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user , setUser } = useContext(AuthContext);

  const notify = () =>
    toast.error("Please Try again", {
      position: "bottom-right",
    });

  const logout = async () => {
    try {
      await axios.post(
        "/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setUser(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
      notify();
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-10 pt-6 pb-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "underline decoration-solid" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/bookshelf"
                  className={({ isActive }) =>
                    isActive ? "underline decoration-solid" : ""
                  }
                >
                  BookShelf
                </NavLink>
              </li>
              {isLoggedIn ? (
                <div>
                  <li>
                    <NavLink onClick={logout}>logOut</NavLink>
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        isActive ? "underline decoration-solid" : ""
                      }
                    >
                      SignUp
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "underline decoration-solid" : ""
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl">Bookshlef</div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "underline decoration-solid" : ""
                }
              >
                <div>Home</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookshelf"
                className={({ isActive }) =>
                  isActive ? "underline decoration-solid" : ""
                }
              >
                <div>Bookshelf</div>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <div className="flex justify-center items-center gap-2">
              <p>{user}</p>
              <NavLink onClick={logout}>
                <div className="btn mx-5 max-lg:hidden rounded-2xl">LogOut</div>
              </NavLink>
            </div>
          ) : (
            <div>
              <NavLink to="/signup">
                <div className="btn mx-5 max-lg:hidden rounded-2xl">SignUp</div>
              </NavLink>

              <NavLink to="/login">
                <div className="btn mr-8 rounded-2xl">LogIn</div>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
