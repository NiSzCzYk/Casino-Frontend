import { useReducer, useState } from "react";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

import "./RouletteForm.css";

const RouletteForm = ({ spin, message, balance, user }) => {
  const [gameVariant, setGameVariant] = useState("");

  const typeOfGame = (event) => {
    setGameVariant(event.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const betInput = watch("bet");
  const choseNumberInput = watch("choseYourNumber");

  const rouletteOptions = {
    bet: {
      required: "Bet is required",
      min: { value: 10, message: "Minimum amount of credits to bet is 10" },
      type: "number",
    },
    choseYourNumber: {
      required: "You must chose number",
      type: "number",
      min: { value: 0, message: "Minimum value is 0" },
      max: { value: 36, message: "Max value is 36" },
    },
  };

  return (
    <div className="roulette-form auth-page">
      <Form
        className="roulette-custom auth-form"
        onSubmit={handleSubmit((data) => {
          spin(betInput, choseNumberInput, gameVariant);
        })}
      >
        <h1>Pick your bet</h1>
        <Row className="g-2">
          <Col>
            <Form.Group className="messages-group">
              <p className="message-title">Actual bet</p>
              {betInput === "" ? <p className="message">0$</p> : <p className="message">{betInput}$</p>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="messages-group">
              <p className="message-title">Your balance</p>
              {balance === "" ? <p className="message">{user.state}$</p> : <p className="message">{balance}$</p>}
            </Form.Group>
          </Col>
        </Row>

        <br />
        <div className="roulette-form-row">
          <div className="roulette-form-col">
            <div className="game-option">
              <select onChange={typeOfGame} className="varinat-select">
                <option value="">Chose variant of game</option>
                <option value="red">Red</option>
                <option value="black">Black</option>
                <option value="odd">Odd</option>
                <option value="even">Even</option>
                <option value="gt18">Gt 18</option>
                <option value="lt19">Lt 19</option>
                <option value="luckyNumber">Lucky Number</option>
              </select>
            </div>
            {gameVariant !== "luckyNumber" ? (
              <p> </p>
            ) : (
              <FloatingLabel controlId="floatingInput" label="Chose your number" className="mb-3 roulette-label">
                <Form.Control
                  className="auth-input"
                  {...register("choseYourNumber", rouletteOptions.choseYourNumber)}
                  type="number"
                  placeholder=" "
                />
                <small className="text-error">{errors?.choseYourNumber && errors.choseYourNumber.message}</small>
              </FloatingLabel>
            )}
          </div>
          <div className="roulette-form-col">
            <FloatingLabel controlId="floatingInput" label="Bet" className="mb-3 roulette-label">
              <Form.Control
                className="auth-input"
                {...register("bet", rouletteOptions.bet)}
                type="number"
                placeholder=" "
              />
              <small className="text-error">{errors?.bet && errors.bet.message}</small>
            </FloatingLabel>
            <Button className="spin-button" type="submit" variant="danger">
              Play
            </Button>
          </div>
        </div>
        {message === "" ? <p> </p> : <p className="error-message">{message}</p>}
      </Form>
    </div>
  );
};

export default RouletteForm;
