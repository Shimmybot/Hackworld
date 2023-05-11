import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PageContainer() {
  const [pageState, setState] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/servers", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (sessionStorage.getItem("loginToken") === null) {
    return (
      <div className="login--container">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    );
  }
  if (pageState.length === 0) {
    return <>Loading...</>;
  } else {
    return (
      <div className="game--container">
        <img></img>
      </div>
    );
  }
}
