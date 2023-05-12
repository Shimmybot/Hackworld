import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServerContainer from "../ServerContainer/ServerContainer";
import SkillContainer from "../SkillContainer/SkillContainer";
import PlayContainer from "../PlayContainer/PlayContainer";
import "./pageContainer.scss";

export default function PageContainer() {
  const [servers, setServers] = useState([]);
  const [pageImage, setImage] = useState("");
  const [currentPage, setPage] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/servers", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
        },
      })
      .then((response) => {
        const newState = response.data;
        setServers(newState);
        setPage(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const setServer = (server) => {
    setPage(server);
  };
  useEffect(() => {
    const setImg = async () => {
      const img = `http://localhost:8080/images/${currentPage.id}.png`;
      await setImage(img);
    };
    if (currentPage !== undefined) {
      setImg("");
    }
  }, [currentPage, pageImage]);

  const update = () => {};

  if (sessionStorage.getItem("loginToken") === null) {
    return (
      <div className="login__container">
        <div className="login__card">
          <Link to="/login" className="login__link">
            {"> "}Login
          </Link>
          <Link to="/signup" className="login__link">
            {"> "}Signup
          </Link>
        </div>
      </div>
    );
  }

  if (document.getElementById("container")) {
    document.getElementById(
      "container"
    ).style.backgroundImage = `url(${pageImage})`;
  }
  return (
    <div id="container" className="game__container">
      <SkillContainer currentPage={currentPage} />
      <PlayContainer setServer={setServer} />
      <ServerContainer
        servers={servers}
        currentPage={currentPage}
        setServer={setServer}
      />
    </div>
  );
}
