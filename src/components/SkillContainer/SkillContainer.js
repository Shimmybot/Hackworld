import { useEffect, useRef, useState } from "react";
import "./skillContainer.scss";
import axios from "axios";

export default function SkillContainer({ currentPage, update }) {
  const [skills, setSkills] = useState([]);
  const [attacking, setAttacking] = useState(false);
  const [usedSkill, setSkill] = useState();
  const [buttonState, setButton] = useState(">>");
  const [sidebarState, setSidebar] = useState(true);
  const sidebar = useRef();
  const handleSkill = (event) => {
    setSkill(event.target.textContent);
    setAttacking(true);
    update(true);
  };
  const sidebarHandler = (event) => {
    if (sidebarState) {
      setButton("<<");
      setSidebar(false);
      sidebar.current.className = "list__container--closed";
    } else {
      setButton(">>");
      setSidebar(true);
      sidebar.current.className = "list__container--open";
    }
  };
  useEffect(() => {
    console.log(usedSkill);
    console.log(attacking);
    if (attacking === true) {
      const damage = skills.find(
        (element) => element.skill_name === usedSkill
      ).damage;
      axios
        .post(
          `http://localhost:8080/api/servers/${currentPage.id}`,
          {
            damage: damage,
          },

          {
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
            },
          }
        )
        .then((result) => {
          console.log(result);
        });
    }
    setSkill("");
    setAttacking(false);
  }, [attacking]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/skills`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
        },
      })
      .then((response) => {
        const tmpSkills = [skills, ...response.data];
        tmpSkills.shift();
        setSkills(tmpSkills);
      });
  }, []);
  if (skills !== undefined) {
    return (
      <div className="skill__container">
        <div className="list__container--open" ref={sidebar}>
          <h3>Owned Skills:</h3>
          <ul className="skill__list">
            {skills.map((element) => {
              return (
                <li key={element.id}>
                  <div onClick={handleSkill}>{element.skill_name}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sidebar__button--right" onClick={sidebarHandler}>
          {buttonState}
        </div>
      </div>
    );
  } else {
    return (
      <div className="skill__container">
        <h3>Owned Skills:</h3>
        <ul></ul>
      </div>
    );
  }
}
