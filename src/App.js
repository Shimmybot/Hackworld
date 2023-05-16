import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageContainer from "./components/PageContainer/PageContainer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./app.scss";
import bgMusic from "./Assets/Audio/scott-buckley-neon.mp3";

function App() {
  let music = new Audio(bgMusic);
  music.volume = 0.02;
  music.loop = true;
  music.play();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
