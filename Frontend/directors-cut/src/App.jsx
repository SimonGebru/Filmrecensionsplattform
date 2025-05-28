import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
