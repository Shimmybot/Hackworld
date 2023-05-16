import { useEffect, useState, useRef } from "react";
import "./serverContainer.scss";
import axios from "axios";

export default function ServerContainer({
  servers,
  setServer,
  currentPage,
  login,
}) {
  const [currentServer, setCurrent] = useState();
  const [buttonState, setButton] = useState("<<");
  const [sidebarState, setSidebar] = useState(true);
  const sidebar = useRef();

  function logoutHandle() {
    console.log("logout clicked");
    login();
  }

  const sidebarHandler = (event) => {
    if (sidebarState) {
      setButton(">>");
      setSidebar(false);
      sidebar.current.className = "list__container--closed";
      sidebar.current.firstChild.className = "list__content--closed";
      console.log(sidebar.current);
    } else {
      setButton("<<");
      setSidebar(true);
      sidebar.current.className = "list__container--open";
      sidebar.current.firstChild.className = "list__content--open";
    }
  };

  const clickHandler = (event) => {
    const id = event.target.parentElement.id;
    const server = servers.find((element) => element.id === id);
    setCurrent(server);
    setServer(server);
  };

  useEffect(() => {
    if (currentPage !== undefined) {
      setCurrent(currentPage);
    } else {
      setCurrent(servers[0]);
    }
  }, []);

  useEffect(() => {
    setCurrent(currentPage);
  }, [currentPage]);
  if (currentServer !== undefined) {
    return (
      <div className="servers__container">
        <div className="sidebar__button--left" onClick={sidebarHandler}>
          {buttonState}
        </div>
        <div className="list__container--open" ref={sidebar}>
          <div className="list__content--open">
            <div className="servers__owned">
              <h3 className="servers__owned--title">Owned Servers:</h3>
              <ul className="servers__list">
                {servers.map((element) => {
                  return (
                    <li
                      key={element.id}
                      id={element.id}
                      className="servers__item"
                    >
                      <div onClick={clickHandler}>{element.server_name}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="servers__bottom">
              <div className="servers__current">
                <h3 className="servers__current--title">Current Server:</h3>
                <p>
                  {"> "}Name: {currentServer.server_name}
                </p>
                <p>
                  {"> "}Level: {currentServer.server_level}
                </p>
                <p>
                  {"> "}Health: {currentServer.health}
                </p>
              </div>
              <div className="nav__bar">
                <div className="help">Getting Started</div>
                <div className="logout__button" onClick={logoutHandle}>
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="servers__container">
        <div className="sidebar__button--left" onClick={sidebarHandler}>
          {buttonState}
        </div>
        <div className="list__container--open" ref={sidebar}>
          <div className="list__content--open">
            <div className="servers__owned">
              <h3 className="servers__owned--title">Owned Servers:</h3>
              <ul className="servers__list">
                {servers.map((element) => {
                  return (
                    <li
                      key={element.id}
                      id={element.id}
                      className="servers__item"
                    >
                      <div onClick={clickHandler}>{element.server_name}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav__bar">
              <div className="help">Getting Started</div>
              <div className="logout__button" onClick={logoutHandle}>
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
