import React, { useEffect, useState } from "react";
import Login from "./Component/Login/login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Layout from "./Component/Layout";
import Profile from "./Component/Screens/Profile";
import { Context } from "./Helper/Context";

const App = () => {
  const [Amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);

  const [renderAmount, setrenderAmountn] = useState();

  return (
    <Context.Provider
      value={{
        Amount,
        setAmount,
        open,
        setOpen,
        renderAmount,
        setrenderAmountn,
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </Context.Provider>
  );
};

export default App;
