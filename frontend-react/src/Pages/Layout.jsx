import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user } = useContext(AppContext);

  return (
    <>
      <header>
        <nav>
          <Link
            to="/"
            className=" text-white py-2 px-4 rounded focus:outline-none "
          >
            Home
          </Link>
          {user ? (
            <div>
              <p className="text-white">Hello {user.name}</p>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/register"
                className=" text-white py-2 px-4 rounded focus:outline-none "
              >
                Register
              </Link>
              <Link
                to="/login"
                className=" text-white py-2 px-4 rounded focus:outline-none "
              >
                Login
              </Link>
            </div>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
