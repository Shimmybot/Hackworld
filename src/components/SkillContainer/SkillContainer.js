import { useEffect, useState } from "react";
import "./skillContainer.scss";
import axios from "axios";

export default function SkillContainer({ currentPage }) {
  const [skills, setSkills] = useState([]);
  const [attacking, setAttacking] = useState(false);
  const [usedSkill, setSkill] = useState();

  const handleSkill = (event) => {
    setSkill(event.target.textContent);
    setAttacking(true);
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
