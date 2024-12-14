import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    }
  }

  return (
    <div className="max-w-[600px] mx-auto ">
      <h1 className="title dark:text-neutral-100 mt-10">Register</h1>
      <form onSubmit={handleRegister} className="w-2/3 space-y-4 mx-auto ">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            className="mt-6 w-full p-2 rounded text-black bg-slate-200 dark:text-slate-100 dark:bg-slate-700"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            className=" w-full p-2 rounded text-black bg-slate-200 dark:text-slate-100 dark:bg-slate-700"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            className=" w-full p-2 rounded text-black bg-slate-200 dark:text-slate-100 dark:bg-slate-700"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password confirmation"
            value={formData.password_confirmation}
            className=" w-full p-2 rounded text-black bg-slate-200 dark:text-slate-100 dark:bg-slate-700"
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>
        <button className="primary-btn">Register</button>
      </form>
    </div>
  );
}
