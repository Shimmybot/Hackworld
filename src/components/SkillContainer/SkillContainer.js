import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import "./skillContainer.scss";
import { skillList } from "../../skills.js";
import SkillCard from "../SkillCard/SkillCard";
import axios from "axios";

export default function SkillContainer({ currentPage, update, level }) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const port = process.env.PORT;
  const [skills, setSkills] = useState([]);
  const [skillHover, setHover] = useState({
    skillName: "",
    skill_level: "",
    damage: "",
  });
  const [attacking, setAttacking] = useState(false);
  const [usedSkill, setSkill] = useState();
  const [buttonState, setButton] = useState(">>");
  const [sidebarState, setSidebar] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
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

  function addSkill(skill) {
    console.log("adding");
    axios
      .post(`${serverUrl}/api/users/skills`, skill, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          console.log("added");
          console.log(result);
          update(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openModal() {
    console.log("opening Modal");
    setIsOpen(true);
  }

  function closeModel() {
    setIsOpen(false);
  }

  const hoverHandler = (event) => {
    const currentSkill = skills.find((element) => {
      return element.skill_name === event.target.textContent;
    });
    setHover(currentSkill);
  };

  const stopHover = (event) => {
    setHover({
      skillName: "",
      skill_level: "",
      damage: "",
    });
  };

  useEffect(() => {
    if (attacking === true) {
      const damage = skills.find(
        (element) => element.skill_name === usedSkill
      ).damage;
      axios
        .post(
          `${serverUrl}/api/servers/${currentPage.id}`,
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
      .get(`${serverUrl}/api/users/skills`, {
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
          <div className="skill__top">
            <h3>Owned Skills:</h3>
            <ul className="skill__list">
              {skills.map((element) => {
                return (
                  <li key={element.id} className="skill__item">
                    <div
                      onClick={handleSkill}
                      onMouseOver={hoverHandler}
                      on
                      onMouseLeave={stopHover}
                    >
                      {element.skill_name}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="skill__add" onClick={openModal}>
              + add skill
            </div>
          </div>
          <div className="skill__details">
            <p>
              {"> "}Name: {skillHover.skill_name}
            </p>
            <p>
              {"> "}Level: {skillHover.skill_level}
            </p>
            <p>
              {"> "}Damage: {skillHover.damage}
            </p>
          </div>
        </div>
        <div className="sidebar__button--right" onClick={sidebarHandler}>
          {buttonState}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModel}
          className="skill__modal"
          contentLabel="Skill Modal"
        >
          <div className="modal__header">
            <h2>Add your skill</h2>
          </div>
          <div className="modal__content">
            {skillList.map((element) => {
              return (
                <SkillCard skill={element} click={addSkill} level={level} />
              );
            })}
          </div>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="skill__container">
        <h3>Owned Skills:</h3>
        <ul></ul>
        <div className="skill__add" onClick={openModal}>
          + add skill
        </div>
      </div>
    );
  }
}
