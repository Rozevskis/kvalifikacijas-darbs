import { Link, Outlet } from "react-router-dom";

export default function Layout() {
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
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
