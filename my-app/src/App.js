import "./App.css";
import { useState, useRef } from "react";

const sendData = (formData) => {
  console.log(formData);
};

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitButtonRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== secondPassword) {
      setError("пароли не совпадают");
    } else {
      setError("");
    }
    sendData({ email, password, secondPassword });
    setSubmitted(true);
    submitButtonRef.current.focus();
  };

  const onEmailChange = ({ target }) => {
    setEmail(target.value);

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)) {
      setError("");
    } else {
      setError("введите корректный email");
    }
  };

  const onPasswordChange = ({ target }) => {
    if (!submitted) {
      setPassword(target.value);

      if (target.value.length < 6) {
        setError("пароль должен быть больше 6 символов");
      } else {
        setError("");
      }
    }
  };

  const onSecondPasswordChange = ({ target }) => {
    if (!submitted) {
      setSecondPassword(target.value);
      if (target.value !== password) {
        setError("пароли не совпадают");
      } else {
        setError("");
      }
    }
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setSecondPassword("");
    setError("");
    setSubmitted(false);
  };

  const isButtonDisabled =
    !email || !password || !secondPassword || !!error || submitted;

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <p>Регистрация</p>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="почта"
          onChange={onEmailChange}
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="пароль"
          onChange={onPasswordChange}
        />

        <input
          type="password"
          name="secondPassword"
          value={secondPassword}
          placeholder="повтор пароля"
          onChange={onSecondPasswordChange}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={isButtonDisabled} ref={submitButtonRef}>
          Зарегистрироваться
        </button>
        <button type="button" onClick={reset}>
          сброс
        </button>
      </form>
    </div>
  );
}

export default App;
