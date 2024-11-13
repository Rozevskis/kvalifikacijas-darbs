import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <h1 className="title">Register</h1>
      <form onSubmit={handleRegister} className="w-1/2 space-y-4 mx-auto ">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password confirmation"
          value={formData.password_confirmation}
          onChange={(e) =>
            setFormData({ ...formData, password_confirmation: e.target.value })
          }
        />
        <button className="primary-btn">Register</button>
      </form>
    </div>
  );
}
