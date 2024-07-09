// src/Navbar.js
import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import { Sidebar } from "../SideBar/Sidebar";
import useFetch from "../Hook/usefetch";
import { Context } from "../../Helper/Context";

const Navbar = () => {

  const {Amount , setAmount} = useContext(Context)
  const {renderAmount, setrenderAmountn} = useContext(Context);

  useEffect(()=>{
  console.log("renderAmountrenderAmount" , renderAmount)
  },[renderAmount])

  const {Data,ispending,errormsg} =  useFetch('https://localhost:7115/User/CoinAmount' ,renderAmount)

  useEffect(()=>{
      console.log(Data)
      setAmount(Data)
  },[Data])
  useEffect(() => {
    const background = document.querySelector("#background");

    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const currentIndex = Math.floor(scrollY / (innerHeight - 200));
      background.style.transform = `translateX(${
        currentIndex > 0 ? 56 * currentIndex : 0
      }px)`;
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [displayCard, setDisplaycard] = useState(false);

  const handleDisplayCard = () => {
    setDisplaycard(!displayCard);
  };

  return (
    <>
    <div className="nav">
      <div>

      </div>
      <div className="nav-items">
        <a style={{  display: "flex" }}>
          <span style={{ marginRight: "10px" }}> {Amount}$</span>

          <span className="material-symbols-outlined">account_balance_wallet</span>
        </a>
        <a onClick={handleDisplayCard} href="#contact">
          <span className="material-symbols-outlined">person</span>
        </a>
        {displayCard && (
          <div className="ProfileCard">

            <div>
            <span style={{fontSize:'17px'}} className="material-symbols-outlined">logout</span>
          
            <span style={{fontSize: '14px' , position: "relative" , top: '-2px'}}>Logout</span>
            </div>
        
          
            
          </div>
        )}
      </div>
    </div>

    
    </>
  );
};

export default Navbar;
