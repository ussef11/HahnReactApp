import React, { useEffect, useState } from "react";
//import AuthService from "../../services/auth.service";
//import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import "./login.css";

import Hahn  from "../../Media/Hahn.png"
import Navbar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate =  useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("jwtToken");
    if(token){
      localStorage.removeItem('jwtToken')
    }

  },[])

  //let navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [usernameF, setusernameF] = useState("");
  const [passwordF, setpasswordF] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [iferr, setiferr] = useState(false);
  const [newpassword, setnewpassword] = useState("");
  const [Repassword, setRepassword] = useState("");


  const login = async (username, password) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "username": username,
      "password": password
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    try {
      const response = await fetch("https://localhost:7115/user/Login", requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      //console.log(result); 
     // navigate('/profile');
      return result;
    } catch (error) {
      console.error("There was an error!", error);
      setErrorMsg("Login failed", error);
      setiferr(true);
      throw error;
    }
  };
  


  const handlelogin = (e) => {
      e.preventDefault();
    if (username === "" || password === "") {
		setErrorMsg("Champs is obligatoire ! ");
		setiferr(true);
      return;
    }

      login(username, password)
      .then((data) => {
      console.log(data)
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("username", data.userName);
      navigate('/profile');
      })
      .catch((error) => {
      console.error("Login failed:", error);
      setiferr(true);
      setErrorMsg("Login failed", error);
      });

  


    // console.log(username, password);
  };

  const [error, setError] = useState({
    username: false,
    password: false,
    newpassword: false,
    Repassword: false,
  });

  const [npss, setnpss] = useState();
  const [rpss, setrpss] = useState();
  const [showerr, setshowerr] = useState(false);
  const validateErr = (e) => {
    const { name, value } = e.target;
    let _password;
    let _repassword;
    if (name === "username") {
      if (value.trim() === "") {
        setError((prev) => ({ ...prev, username: true }));
      } else {
        setError((prev) => ({ ...prev, username: false }));
      }
    }
    if (name === "password") {
      if (value.trim() === "") {
        setError((prev) => ({ ...prev, password: true }));
      } else {
        setError((prev) => ({ ...prev, password: false }));
      }
    }
    if (name === "newpassword") {
      if (value.trim() === "") {
        console.log("err password");
        setError((prev) => ({ ...prev, newpassword: true }));
      } else {
        setError((prev) => ({ ...prev, newpassword: false }));
      }
    }
    if (name === "repassword") {
      if (value.trim() === "") {
        setError((prev) => ({ ...prev, Repassword: true }));
      } else {
        setError((prev) => ({ ...prev, Repassword: false }));
      }
    }
  };

  const handleChangepass = (e) => {

  };

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
  };


useEffect(()=>{
	if(Repassword !== newpassword){
		setshowerr(true)
	}else{
		setshowerr(false)
	}

},[Repassword ,newpassword ])

  return (
    <>  
 
    
    <div className="Bodylogin">
      <div
        className={`containerLogin ${isSignUp ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#">
		  {iferr && (
              <div className="divmsg">
                <p> {errMsg}</p>
              </div>
            )}
            <h1 className="titr">Change Password</h1>
            <div className="social-container">
              
            </div>
            {error.username && (
              <span className="span-danger">Username is required</span>
            )}
            <input
              name="username"
              onBlur={validateErr}
              required
              type="text"
              value={usernameF || ""}
              onChange={(e) => {
                setusernameF(e.target.value);
              }}
              placeholder="Username"
            />
            {error.password && (
              <span className="span-danger">Password is required</span>
            )}
            <input
              name="password"
              onBlur={validateErr}
              required
              type="password"
              value={passwordF || ""}
              onChange={(e) => {
                setpasswordF(e.target.value);
              }}
              placeholder="Old Password"
            />
            {error.newpassword && (
              <span
                style={{ width: "67%", marginLeft: "149px" }}
                className="span-danger"
              >
                New Password is required
              </span>
            )}
            <input
              name="newpassword"
              onBlur={validateErr}
              required
              type="password"
              value={newpassword || ""}
              onChange={(e) => {
                setnewpassword(e.target.value);
              }}
              placeholder="New Password"
            />
            {error.Repassword && (
              <span
                style={{ width: "67%", marginLeft: "113px" }}
 className="span-danger">
                confirm is required
              </span>
            )}
            <input
              name="repassword"
              onBlur={validateErr}
              required
              type="password"
              value={Repassword || ""}
              onChange={(e) => {
                setRepassword(e.target.value);
              }}
              placeholder="Confirm New Password"
            />
            {showerr && (
              <span
                style={{ width: "67%", marginLeft: "149px" }}
                className="span-danger"
              >
                password does not match
              </span>
            )}

            <button onClick={handleChangepass}>Change Password</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            {iferr && (
              <div className="divmsg">
                <p> {errMsg}</p>
              </div>
            )}
            <h1>Sign in</h1>
            <div className="social-container">
             
            </div>
          
            <input
              required
              value={username || ""}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              placeholder="Username"
            />
            <input
              required
              value={password || ""}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <a href="#" onClick={handleSignUp}>
              Forgot your password?
            </a>
            <button onClick={handlelogin}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome !</h1>
              <p>To keep connected with Hahn please login </p>
              <button onClick={handleSignIn} className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1  style={{marginBottom:'14px'}}>Hello!</h1>
              <img style={{height:'103px' , width:'130px'}} src={Hahn} />
              <p>
                Enter your personal details and start journey with Hahn
              </p>
              <div className="copy">
                <p>Copyright (C) 2023-2024 by Hahn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
