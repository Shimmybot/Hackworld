import { useEffect, useState } from "react";
import "./serverContainer.scss";

export default function ServerContainer({ servers, setServer }) {
  const [currentServer, setCurrent] = useState();
  const clickHandler = (event) => {
    const id = event.target.parentElement.id;
    const server = servers.find((element) => element.id === id);
    setCurrent(server);
    setServer(server);
  };
  useEffect(() => {
    setCurrent(servers[0]);
  }, []);

  if (currentServer !== undefined) {
    return (
      <div className="servers__container">
        <div className="servers__owned">
          <h3 className="servers__owned--title">Owned Servers:</h3>
          <ul className="servers__list">
            {servers.map((element) => {
              return (
                <li key={element.id} id={element.id} className="servers__item">
                  <div onClick={clickHandler}>{element.server_name}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="servers__current">
          <h3 className="servers__current--title">Current Server:</h3>
          <p>Name: {currentServer.server_name}</p>
          <p>Level: {currentServer.server_level}</p>
          <p>Health: {currentServer.health}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="servers__container">
        <div className="servers__owned">
          <h3 className="servers__owned--title">Owned Servers:</h3>
          <ul className="servers__list">
            {servers.map((element) => {
              return (
                <li key={element.id} id={element.id} className="servers__item">
                  <div onClick={clickHandler}>{element.server_name}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
