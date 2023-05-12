import { useEffect, useState } from "react";
import "./skillContainer.scss";
import axios from "axios";

export default function SkillContainer() {
  const [skills, setSkills] = useState([]);
  const handleSkill = () => {};
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/skills`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
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
              <li>
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
