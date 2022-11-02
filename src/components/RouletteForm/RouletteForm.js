import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./RouletteForm.css";

const RouletteForm = ({ spin, message }) => {
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
          spin(betInput, choseNumberInput);
        })}
      >
        <h1>Set your bet</h1>
        <br />
        <FloatingLabel controlId="floatingInput" label="How much you want to bet?" className="mb-3 roulette-label">
          <Form.Control
            className="auth-input"
            {...register("bet", rouletteOptions.bet)}
            type="number"
            placeholder=" "
          />
          <small className="text-error">{errors?.bet && errors.bet.message}</small>
        </FloatingLabel>
        <FloatingLabel className="roulette-label" controlId="floatingPassword" label="Chose your number">
          <Form.Control
            className="auth-input"
            {...register("choseYourNumber", rouletteOptions.choseYourNumber)}
            type="number"
            placeholder=" "
          />
          <small className="text-error">{errors?.choseYourNumber && errors.choseYourNumber.message}</small>
        </FloatingLabel>
        <Form.Group className="mb-3 submit-group" controlId="formGroupSubmit">
          {message === "" ? <p> </p> : <p>{message}</p>}
          <Button className="spin-button" type="submit" variant="danger">
            Play
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default RouletteForm;
