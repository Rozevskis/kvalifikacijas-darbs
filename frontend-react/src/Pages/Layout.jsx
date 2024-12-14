import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
// icons
import { IoSearchSharp } from "react-icons/io5";

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
        <nav className="dark:bg-slate-900 shadow-2xl">
          <Link to="/" className=" text-white py-2 px-4 font-semibold ">
            Home
          </Link>

          <div className="w-1/4 rounded-3xl bg-slate-600 text-neutral-400 flex shadow-inner  ">
            <input
              type="text"
              id="video-search"
              className="w-[90%] px-4 py-2 rounded-3xl bg-slate-600 text-neutral-400 "
              placeholder="Search will be here..."
            />
            <div className="w-[10%] h-auto flex items-center justify-center">
              <IoSearchSharp />
            </div>
          </div>
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
