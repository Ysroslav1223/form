import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";

const sendForm = (formData) => {
  console.log(formData);
};

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setsecondPassword] = useState("");
  const [error, setError] = useState("");
  const [subbmit, setSubbmit] = useState(false);
  const isButtonRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== secondPassword) {
      setError("пароли не совпадают");
      return;
    } else if (password.length !== 7 && secondPassword.length !== 7) {
      setError("пароль должен быть больше 6 символов");
      return;
    }
    sendForm({ email, password, secondPassword });
    setSubbmit(true);
  };

  const onValidEmailChange = ({ target }) => {
    setEmail(target.value);

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)) {
      setError("");
    } else {
      setError("введите корректный email");
    }
  };

  const onValidPasswordChange = ({ target }) => {
    if (!subbmit) {
      setPassword(target.value);

      if (target.value.length < 6) {
        setError("пароль должен быть больше 6 символов");
      } else {
        setError("");
      }
    }
  };

  const onValidSecondPasswordChange = ({ target }) => {
    if (!subbmit) {
      setsecondPassword(target.value);

      if (target.value !== password && target.value) {
        setError("пароли не совпадают");
      } else {
        setError("");
      }
    }
  };

  const reset = () => {
    setEmail("");
    setError("");
    setPassword("");
    setsecondPassword("");
    setSubbmit(false);
  };

  const isBattonClose =
    !email || !password || !secondPassword || error || subbmit;

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          placeholder="email"
          onChange={onValidEmailChange}
        />

        <input
          name="password"
          type="password"
          value={password}
          placeholder="пароль"
          onChange={onValidPasswordChange}
        />
        <input
          name="secondPassword"
          type="password"
          value={secondPassword}
          placeholder="повтор пароля"
          onChange={onValidSecondPasswordChange}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={isBattonClose} ref={isButtonRef}>
          отправить
        </button>
        <button type="button" onClick={reset}>
          сброс
        </button>
      </form>
    </div>
  );
}

export default App;
