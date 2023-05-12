import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.scss";

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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login__container">
      <form ref={form} onSubmit={handleSubmit} className="login__card">
        <label className="login__label">{">"}Username</label>
        <input name="username" className="login__field" />
        <label className="login__label">{">"}Password</label>
        <input name="password" type="password" className="login__field" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
