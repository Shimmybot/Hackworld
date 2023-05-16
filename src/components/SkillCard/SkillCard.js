import { useState } from "react";
import "./skillCard.scss";

export default function SkillCard({ skill, click, level }) {
  const [cardSkill, setSkill] = useState(skill);
  function selectSkill() {
    click(cardSkill);
  }
  if (level >= skill.skill_level) {
    if (skill.damage > 0) {
      return (
        <div className="card" onClick={selectSkill}>
          <p className="card__name">
            {"> "}
            {skill.skill_name}
          </p>
          <p className="card__level">
            {"> "}required level: {skill.skill_level}
          </p>
          <p className="card__damage">
            {"> "}Damages Server: {skill.damage}
          </p>
        </div>
      );
    } else {
      return (
        <div className="card" onClick={selectSkill}>
          <p className="card__name">
            {"> "}
            {skill.skill_name}
          </p>
          <p className="card__level">
            {"> "}required level: {skill.skill_level}
          </p>
          <p className="card__damage">
            {"> "}Fortifies Server: {Math.abs(skill.damage)}
          </p>
        </div>
      );
    }
  } else {
    if (skill.damage > 0) {
      return (
        <div className="card--inert">
          <p className="card__name">
            {"> "}
            {skill.skill_name}
          </p>
          <p className="card__level">
            {"> "}required level: {skill.skill_level}
          </p>
          <p className="card__damage">
            {"> "}Damages Server: {skill.damage}
          </p>
        </div>
      );
    } else {
      return (
        <div className="card--inert">
          <p className="card__name">
            {"> "}
            {skill.skill_name}
          </p>
          <p className="card__level">
            {"> "}required level: {skill.skill_level}
          </p>
          <p className="card__damage">
            {"> "}Fortifies Server: {Math.abs(skill.damage)}
          </p>
        </div>
      );
    }
  }
}
