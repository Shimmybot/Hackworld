import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const form = useRef();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: form.current.username.value,
      password: form.current.password.value,
    };
    axios
      .post("http://localhost:8080/api/users/login", user)
      .then((response) => {
        sessionStorage.setItem("loginToken", response.data.token);
        navigate("/");
      });
  };
  return (
    <div>
      <form ref={form} onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" />
        <label>Password</label>
        <input name="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
