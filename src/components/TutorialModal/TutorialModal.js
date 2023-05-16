import Modal from "react-modal";
import "./tutorialModal.scss";

export default function TutorialModal({ openModal, setModal }) {
  function closeModal() {
    setModal(false);
  }
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      className="tutorial__modal"
      contentLabel="Tutorial Modal"
      ariaHideApp={false}
    >
      <h1 className="tutorial__header">Getting Started</h1>
      <div className="tutorial__content">
        <div className="tutorial__description">
          <p>{"> "}Welcome to HackWorld!</p>
          <p>{"> "}The goal of the game is to visit websites and</p>
          <p>{"> "} attack them with your growing asenal of exploits</p>
        </div>
        <div className="tutorial__skills">
          <p>{"> "}get started by taking your first skill BruteSSH</p>
          <p>{"> "}You'll be able to get more</p>
          <p>{"> "}Your level is the total level of all your owned servers</p>
          <p>
            {"> "}You start at level 0, so you'll only be able to get the 1
            skill
          </p>
        </div>
        <div className="tutorial__servers">
          <p>
            {"> "}Once you take over servers they'll appear on the right here
          </p>
          <p>
            {"> "}Be careful though because other players can take them over
          </p>
          <p>{"> "}Enjoy and get hacking!</p>
        </div>
        <div className="credits">
          <p>
            {"> "}Neon by Scott Buckley |{" "}
            <a href="https://soundcloud.com/scottbuckley">
              https://soundcloud.com/scottbuckley
            </a>
          </p>
          <p>
            {"> "}Music promoted by{" "}
            <a href=" https://www.free-stock-music.com">
              https://www.free-stock-music.com
            </a>
          </p>
          <p>
            {"> "}Creative Commons / Attribution 4.0 International (CC BY 4.0){" "}
            <a href="https://creativecommons.org/licenses/by/4.0/">
              https://creativecommons.org/licenses/by/4.0/
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
