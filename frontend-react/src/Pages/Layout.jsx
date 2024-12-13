import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      Navigate("/");
    }
  }
  return (
    <>
      <header>
        <nav>
          <Link to="/" className=" text-white py-2 px-4 font-semibold ">
            Home
          </Link>
          {user ? (
            // Authenticated
            <div className="space-x-4 flex items-center">
              <p className="text-white py-2 px-4">Hello {user.name}</p>
              <Link
                to="/create"
                className=" text-white py-2 px-4 flex flex-col items-center mb-[-20px]"
              >
                Uplaod
                <i className="fa fa-download" aria-hidden="true"></i>
              </Link>
              <form onSubmit={handleLogout}>
                <button className="text-white py-2 px-4 ">Logout</button>
              </form>
            </div>
          ) : (
            // Guest
            <div className="space-x-4">
              <Link to="/register" className=" text-white py-2 px-4 ">
                Register
              </Link>
              <Link to="/login" className=" text-white py-2 px-4 ">
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
