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
  const [needUpdate, setUpdate] = useState(false);

  const setServer = (server) => {
    setPage(server);
  };

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

  useEffect(() => {
    const setImg = async () => {
      const img = `http://localhost:8080/images/${currentPage.id}.png`;
      await setImage(img);
    };
    if (currentPage !== undefined) {
      setImg("");
    }
  }, [currentPage, pageImage, needUpdate]);

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
        console.log(servers);
      })
      .catch((error) => {
        console.log(error);
      });
    if (currentPage !== undefined) {
      axios
        .get(`http://localhost:8080/api/servers/${currentPage.id}`)
        .then((response) => {
          console.log(response.data);
          setPage(response.data[0]);
        });
    }
    setUpdate(false);
  }, [needUpdate]);

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
      <SkillContainer currentPage={currentPage} update={setUpdate} />
      <PlayContainer setServer={setServer} />
      <ServerContainer
        servers={servers}
        currentPage={currentPage}
        setServer={setServer}
      />
    </div>
  );
}
