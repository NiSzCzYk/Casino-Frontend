import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { useNavigate } from "react-router-dom";
import RouletteForm from "../../RouletteForm/RouletteForm";

import axios from "axios";
import "./Roulette.css";

const Roulette = () => {
  const navigate = useNavigate();
  const [spinState, setSpinState] = useState(false);
  const [result, setResult] = useState(0);
  const [successSpinMessage, setSuccessSpinMessage] = useState("");
  const [negativeMessage, setNegativeMessage] = useState("");
  const [user, setUSer] = useState([]);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user/me",
    }).then((res) => {
      if (!res.data.userID) {
        navigate("/");
      } else {
        setUSer(res.data);
      }
    });
  }, [user]);

  const spinAWheel = (bet, chosenNumber, variant) => {
    setSuccessSpinMessage("");
    setNegativeMessage("");
    axios({
      method: "POST",
      data: {
        credits: bet,
        number: chosenNumber,
        variant: variant,
      },
      withCredentials: true,
      url: "http://localhost:4000/game/roulette",
    }).then((res) => {
      if (res.data.result === "") {
        setNegativeMessage(res.data.message);
      } else {
        setSuccessSpinMessage(res.data.message);
        setResult(res.data.result);
        setBalance(res.data.balance);
        setSpinState(true);
      }
    });
    setSpinState(false);
  };

  const data = new Array(36).fill(true).map((_, index) => ({
    option: index + 1,
    style: { backgroundColor: index % 2 ? "#1D1E26" : "#E0080B", textColor: "white" },
  }));
  data.unshift({ option: "0", style: { backgroundColor: "#016D29", textColor: "white" } });

  return (
    <>
      <div className="roulette-game-box">
        <div className="roulette-container">
          <Wheel
            mustStartSpinning={spinState}
            prizeNumber={result}
            data={data}
            radiusLineColor={"#F3C620"}
            innerBorderColor={"#F3C620"}
            outerBorderColor={"#F3C620"}
            innerBorderWidth={8}
            outerBorderWidth={8}
            innerRadius={20}
            textDistance={80}
          />

          {successSpinMessage && (
            <p className="roulette-result-info">
              {successSpinMessage}. Winning number is {result}
            </p>
          )}
        </div>
        <RouletteForm message={negativeMessage} spin={spinAWheel} balance={balance} user={user} />
      </div>
    </>
  );
};

export default Roulette;
