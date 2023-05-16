import { useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.scss";

export default function Signup() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const port = process.env.PORT;
  const form = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      username: form.current.username.value,
      password: form.current.password.value,
    };
    axios
      .post(`${serverUrl}/api/users/signup`, newUser)
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="signup__container">
      <form ref={form} onSubmit={handleSubmit} className="signup__card">
        <label className="signup__label">Username</label>
        <input name="username" className="signup__field" />
        <label className="signup__label">Password</label>
        <input name="password" type="password" className="signup__field" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
