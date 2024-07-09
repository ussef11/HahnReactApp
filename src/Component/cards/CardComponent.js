import React, { useContext, useEffect, useState } from "react";
import "./Card.css";
import useFetch from "../Hook/usefetch";
import { Context } from "../../Helper/Context";
import Mypopup from "../Mypopup/Mypopup";

const CardComponent = ({ Accepted }) => {
  const { Amount, setAmount } = useContext(Context);
  const { open, setOpen } = useContext(Context);
  const [GetAll, setGetAll] = useState();
  const [CargoNb, setCargoNb] = useState();

  const { renderAmount, setrenderAmountn } = useContext(Context);

  const [refused, setrefused] = useState();
  const { Data: AllOrders } = useFetch(
    "https://localhost:7115/Order/GetAllAvailable",
    Accepted
  );



function getAll() {
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwtToken')}`);


const requestOptions = {
  method: "GET",
  headers: myHeaders,
  
  redirect: "follow"
};

fetch("https://localhost:7115/CargoTransporter/GetAll", requestOptions)
  .then((response) => response.json())
  .then((result) => { console.log('GetAll ' , result)
         setCargoNb(result)
  }) 
  .catch((error) => console.error(error));
}

  useEffect(() => {
    console.log("Accepted", Array.isArray(Accepted) && Accepted);
    const filteredOrders =
      Array.isArray(AllOrders) &&
      AllOrders.filter((order) => order.id !== Accepted.id);
    console.log("filteredOrders", filteredOrders);
    setrefused(filteredOrders);
    setrenderAmountn("render");
  }, [AllOrders, Accepted, Amount]);

  useEffect(() => {
    console.log("Amount", Amount);
  }, [Amount]);

  useEffect(() => {
    console.log("length", Array.isArray(Accepted) && Accepted.length);
    console.log("CargoNb", CargoNb);

    async function sumilation() {
      while (Accepted.length >= 1 && Amount > 0) {
        console.log("we need To buy Cargo", CargoNb);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${localStorage.getItem("jwtToken")}`
        );

        const raw = JSON.stringify({
          positionNodeId: 1,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        try {
          const buyResponse = await fetch(
            "https://localhost:7115/CargoTransporter/buy",
            requestOptions
          );
          const buyResult = await buyResponse.json();
          console.log("cargo BUY", buyResult);

          if (buyResult !== -1) {
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 3000);

            const getOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            };

            const amountResponse = await fetch(
              "https://localhost:7115/User/CoinAmount",
              getOptions
            );
            const newAmount = await amountResponse.json();
            setAmount(newAmount);
          } else {
            console.error("Error in buying cargo", buyResult);
            break;
          }
        } catch (error) {
          console.error("Error in fetch request", error);
          break;
        }
      }
    }

    if (Amount > 0) {
      sumilation();
      getAll()
    }
  }, [Accepted, Amount, CargoNb]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexacc, setCurrentIndexacc] = useState(0);
  const [currentIndexCargo, setCurrentIndexCargo] = useState(0);

  const handlePrevious = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? refused.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) =>
      prevIndex === refused.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handlePreviousAcc = (e) => {
    e.preventDefault();
    setCurrentIndexacc((prevIndex) =>
      prevIndex === 0 ? Accepted.length - 1 : prevIndex - 1
    );
  };

  const handleNextAcc = (e) => {
    e.preventDefault();
    setCurrentIndexacc((prevIndex) =>
      prevIndex === Accepted.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handlePreviousCargo = (e) => {
    e.preventDefault();
    setCurrentIndexCargo((prevIndex) =>
      prevIndex === 0 ? CargoNb.length - 1 : prevIndex - 1
    );
  };

  const handleNextCargo = (e) => {
    e.preventDefault();
    setCurrentIndexCargo((prevIndex) =>
      prevIndex === CargoNb.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="cards">
      <Mypopup />
      <label className="summary">
        <input className="input" type="checkbox" />
        <article>
          <div className="front">
            <header>
              <h2 className="head">All Order</h2>
              <span className="material-symbols-outlined">more_vert</span>
            </header>
            <var>{Array.isArray(refused) ? refused.length : 0}</var>
            <h3 className="head">
              Orders ID :{" "}
              {Array.isArray(refused) &&
                refused.length > 0 &&
                refused[currentIndex].id}{" "}
            </h3>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "14px",
              }}
            >
              {Array.isArray(refused) && refused.length > 0 && (
                <>
                  <div onClick={handlePrevious} style={{ cursor: "pointer" }}>
                    <span className="material-symbols-outlined">
                      arrow_back_ios
                    </span>
                  </div>

                  <div key={refused[currentIndex].id}>
                    <p className="dates">
                      {refused[currentIndex].deliveryDateUtc}
                    </p>
                  </div>

                  <div onClick={handleNext} style={{ cursor: "pointer" }}>
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="back">
            <header>
              <h2 className="head">More Information</h2>
              <span className="material-symbols-outlined">close</span>
            </header>
            <div className="cargo-details">
              <div className="cargo-item">
                <span className="cargo-label">originNodeId:</span>
                <span className="cargo-value">
                  {Array.isArray(Accepted) &&
                    Accepted.length > 0 &&
                    Accepted[currentIndexacc].originNodeId}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">targetNodeId:</span>
                <span className="cargo-value">
                  {Array.isArray(Accepted) &&
                    Accepted.length > 0 &&
                    Accepted[currentIndexacc].targetNodeId}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">load:</span>
                <span className="cargo-value">
                  {Array.isArray(Accepted) &&
                    Accepted.length > 0 &&
                    Accepted[currentIndexacc].load}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">value:</span>
                <span className="cargo-value">
                  {Array.isArray(Accepted) &&
                    Accepted.length > 0 &&
                    Accepted[currentIndexacc].value}
                </span>
              </div>
            </div>
          </div>
        </article>
      </label>
      <label className="overdue">
        <input className="input" type="checkbox" />
        <article>
          <div className="front">
            <header>
              <h2 className="head">Accepted</h2>
              <span className="material-symbols-outlined">more_vert</span>
            </header>
            <var>{Array.isArray(Accepted) ? Accepted.length : 0}</var>
            <h3 className="head">
              Order ID :{" "}
              {Array.isArray(Accepted) &&
                Accepted.length > 0 &&
                Accepted[currentIndexacc].id}
            </h3>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "14px",
              }}
            >
              {Array.isArray(Accepted) && Accepted.length > 0 && (
                <>
                  <div
                    onClick={handlePreviousAcc}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="material-symbols-outlined">
                      arrow_back_ios
                    </span>
                  </div>

                  <div key={Accepted[currentIndexacc].id}>
                    <p className="dates">
                      {Accepted[currentIndexacc].deliveryDateUtc}
                    </p>
                  </div>

                  <div onClick={handleNextAcc} style={{ cursor: "pointer" }}>
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="back">
            <header>
              <h2 className="head">More Information</h2>
              <span className="material-symbols-outlined">close</span>
            </header>
            <div className="cargo-details">
              <div className="cargo-item">
                <span className="cargo-label">originNodeId:</span>
                <span className="cargo-value">
                  {Array.isArray(Accepted) &&
                    Accepted.length > 0 &&
                    Accepted[currentIndexacc].originNodeId}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">targetNodeId:</span>
                <span className="cargo-value">
                  {Array.isArray(Accepted) &&
                    Accepted.length > 0 &&
                    Accepted[currentIndexacc].targetNodeId}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">load:</span>
                <span className="cargo-value">
                  {Array.isArray(Accepted) &&
                    Accepted.length > 0 &&
                    Accepted[currentIndexacc].load}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">value:</span>
                <span className="cargo-value">
                  {Array.isArray(Accepted) &&
                    Accepted.length > 0 &&
                    Accepted[currentIndexacc].value}
                </span>
              </div>
            </div>
          </div>
        </article>
      </label>
      <label className="features">
        <input className="input" type="checkbox" />
        <article>
          <div className="front">
            <header>
              <h2 className="head">Cargo </h2>
              <span className="material-symbols-outlined">more_vert</span>
            </header>
            <var>{Array.isArray(CargoNb) ? CargoNb.length : 0}</var>
            <h3 className="head">
              Cargo ID :{" "}
              {Array.isArray(CargoNb) &&
                CargoNb.length > 0 &&
                CargoNb[currentIndexCargo].id}
            </h3>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "14px",
              }}
            >
              {Array.isArray(CargoNb) && CargoNb.length > 0 && (
                <>
                  <div
                    onClick={handlePreviousCargo}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="material-symbols-outlined">
                      arrow_back_ios
                    </span>
                  </div>

                  <div key={CargoNb[currentIndexCargo].id}>
                    <p className="dates">
                      {CargoNb[currentIndexCargo].position.name}
                    </p>
                  </div>

                  <div onClick={handleNextCargo} style={{ cursor: "pointer" }}>
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="back">
            <header>
              <h2 className="head">More Information</h2>
              <span className="material-symbols-outlined">close</span>
            </header>
            <div className="cargo-details">
              <div className="cargo-item">
                <span className="cargo-label">capacity:</span>
                <span className="cargo-value">
                  {Array.isArray(CargoNb) &&
                    CargoNb.length > 0 &&
                    CargoNb[currentIndexCargo].capacity}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">Position:</span>
                <span className="cargo-value">
                  {Array.isArray(CargoNb) &&
                    CargoNb.length > 0 &&
                    CargoNb[currentIndexCargo].position.name}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">load:</span>
                <span className="cargo-value">
                  {Array.isArray(CargoNb) &&
                    CargoNb.length > 0 &&
                    CargoNb[currentIndexCargo].load}
                </span>
              </div>
              <div className="cargo-item">
                <span className="cargo-label">owner:</span>
                <span className="cargo-value">
                  {Array.isArray(CargoNb) &&
                    CargoNb.length > 0 &&
                    CargoNb[currentIndexCargo].owner}
                </span>
              </div>
            </div>
          </div>
        </article>
      </label>
    </div>
  );
};

export default CardComponent;
