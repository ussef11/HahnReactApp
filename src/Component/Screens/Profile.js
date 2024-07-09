import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import CardComponent from "../cards/CardComponent";

const Profile = () => {
  const [Accepted, setAccepted] = useState();
  const getOptions = (method) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("jwtToken")}`
    );
    const requestOptions = {
      method: method,
      headers: myHeaders,
      redirect: "follow",
    };

    return requestOptions;
  };

  const navigate = useNavigate();

  const [Data, setData] = useState();

  const [DisplayCard , setDisplayCard]  = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleStartSimulation = async () => {
    const requestOptions = getOptions("POST");

    await fetch("https://localhost:7115/Order/Create", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setData(result);

        GetAcceptedOrder();
        setTimeout(() => {
          setDisplayCard(true)
        }, 1000);
      })
      .catch((error) => console.error(error));
    console.log("Simulation started!");
  };

  async function GetAcceptedOrder() {
    const requestOptions = getOptions("GET");

    await fetch("https://localhost:7115/Order/GetAllAccepted", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(Array.isArray(result) && result.length==0 ){
          handleStartSimulation()
        }
        console.log(result);
        setAccepted(result);
      })
      .catch((error) => console.error(error));
  }



  return (
    <div style={{ width: " 100%" }}>
     
      <div style={{ height: "20px" }}></div>

      <div className="profCard">
    { !DisplayCard  && 
     <h2>
          Welcome <span style={nameStyle}>Hahn!</span> You don't have any orders
          today!
        </h2>}
        <button
          onClick={() => {
            handleStartSimulation();
          }}
          style={buttonStyle}
        >
        {!DisplayCard  ? "Start Simulation ":  "Stop Simulation " }  
        </button>
      </div>
      <div className="CardComp">
        { DisplayCard && <CardComponent Accepted={Accepted} />}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#5ac6d5",
  color: "#fff",
  cursor: "pointer",
  fontSize: "16px",
};
const nameStyle = {
  color: "green",
  fontwheight: 600,
};

export default Profile;
