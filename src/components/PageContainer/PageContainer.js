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
  const [level, setLevel] = useState();
  const [isLoggedIn, setLogin] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const setServer = (server) => {
    setPage(server);
  };
  function setLogout() {
    console.log("logout");
    setLogin(false);
    sessionStorage.removeItem("loginToken");
    if (document.getElementById("container")) {
      document.getElementById("container").style.background = "#000000";
    }
    console.log(isLoggedIn);
  }
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      axios
        .get(`${serverUrl}/api/servers`, {
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
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const setImg = async () => {
      const img = `${serverUrl}/images/${currentPage.id}.png`;
      await setImage(img);
    };
    if (currentPage !== undefined) {
      setImg("");
    }
  }, [currentPage, pageImage, needUpdate]);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`${serverUrl}/api/servers`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
          },
        })
        .then((response) => {
          const newState = response.data;
          setServers(newState);
          let levelAdd = 0;
          for (let i = 0; i < servers.length; i++) {
            levelAdd += servers[i].server_level;
            console.log(typeof servers[i].server_level);
          }
          setLevel(levelAdd);
          console.log(levelAdd);
        })
        .catch((error) => {
          console.log(error);
        });
      if (currentPage !== undefined) {
        axios
          .get(`${serverUrl}/api/servers/${currentPage.id}`)
          .then((response) => {
            console.log(response.data);
            setPage(response.data[0]);
          });
      }
    }
    setUpdate(false);
  }, [needUpdate]);

  if (sessionStorage.getItem("loginToken") === null && !isLoggedIn) {
    return (
      <div className="login__container">
        <h1 className="login__header">{"> "} Hackworld</h1>
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
  } else {
    if (sessionStorage.getItem("loginToken") !== null && !isLoggedIn) {
      setLogin(true);
    }
    if (document.getElementById("container")) {
      document.getElementById(
        "container"
      ).style.backgroundImage = `url(${pageImage})`;
    }
    return (
      <div id="container" className="game__container">
        <SkillContainer
          currentPage={currentPage}
          update={setUpdate}
          level={level}
        />
        <PlayContainer setServer={setServer} />
        <ServerContainer
          servers={servers}
          currentPage={currentPage}
          setServer={setServer}
          login={setLogout}
        />
      </div>
    );
  }
}
