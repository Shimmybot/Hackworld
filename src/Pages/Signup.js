import { useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const form = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      username: form.current.username.value,
      password: form.current.password.value,
    };
    axios
      .post("http://localhost:8080/api/users/signup", newUser)
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <form ref={form} onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" />
        <label>Password</label>
        <input name="password" type="password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
