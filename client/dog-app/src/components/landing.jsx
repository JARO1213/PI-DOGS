import React from 'react';
import '../CSS-Components/csmodule.css'
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {

   const navigate = useNavigate()

    const handleStart = () => {
        navigate('/home')
}

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Bienvenidos</h1>
      </header>
      <main className="main-content">
        <img
          src="https://cdn2.thedogapi.com/images/HyL3bl94Q_1280.jpg"
          alt="dog"
          className="main-image"
        />
        <p> Disfruta de esta experiencia Canina-Digital.</p>
        <button className="cta-button" onClick={handleStart}>Get Started</button>
      </main>
    </div>
  );
};

export default LandingPage;