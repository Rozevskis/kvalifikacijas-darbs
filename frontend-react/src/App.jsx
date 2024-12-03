import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import Create from "./Pages/Videos/Create";
import Show from "./Pages/Videos/Show";

export default function App() {
  const { user } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Guest */}
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />

          {/* Authenticated */}
          <Route path="/create" element={user ? <Create /> : <Login />} />

          {/* Video */}
          <Route path="/videos/:id" element={<Show />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
