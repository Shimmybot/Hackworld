import { useState } from "react";
import "./playContainer.scss";
import axios from "axios";

export default function PlayContainer({ setServer }) {
  const [error, setError] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    let url = event.target.url.value;
    if (
      !url.toLowerCase().includes("http://") ||
      !url.toLowerCase().includes("https://")
    ) {
      url = "https://" + url;
    }
    axios
      .post("http://localhost:8080/api/servers", { url: url })
      .then((response) => {
        console.log(response);
        if (response.data) setServer(response.data);
        setError("");
      })
      .catch((err) => {
        setError(err.code);
        console.log(err);
      });
  };
  return (
    <div className="play__container">
      <form className="play__form" onSubmit={submitHandler}>
        <input name="url" placeholder="http://" />
        <button className="play__button"> {">"}Analyze</button>
        <p>{error}</p>
      </form>
    </div>
  );
}
