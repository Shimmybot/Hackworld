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
        if (response.data) {
          setServer(response.data);
          setError("");
        }
      })
      .catch((err) => {
        setError(err.code);
      });
  };
  return (
    <div className="play__container">
      <form className="play__form" onSubmit={submitHandler}>
        <input name="url" placeholder="http://" className="play__input" />
        <button className="play__button">{">"}Analyze</button>
        <p className="error">{error}</p> 
      </form>
    </div>
  );
}
