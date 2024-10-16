import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateUser } from "./redux/AuthSlice.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PublicLayouts from "./layouts/PublicLayouts";
import UserLayouts from "./layouts/UserLayouts";
import AdminLayouts from "./layouts/AdminLayouts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Header from "./components/Header.jsx";

const App = () => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<PublicLayouts />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<UserLayouts />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/admin" element={<AdminLayouts />}>
          <Route index element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
