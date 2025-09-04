import { useState } from "react";
import './Nav.css';

function Nav({ onNavClick, currentDataID }) {
  
  const handleItemClick = (event) => {
    const clickedID = event.target.id || event.currentTarget.id; // Get ID from clicked element
    onNavClick(clickedID);
  };

  const [burgerMenuClassName, setBurgerMenuClassName] = useState("burger-menu-container");
  const [navClassName, setNavClassName] = useState("nav");

  const burgerClick = () => {
    setBurgerMenuClassName((prev) =>
      prev === "burger-menu-container"
        ? "burger-menu-container active-menu"
        : "burger-menu-container"
    );
    setNavClassName((prev) =>
      prev === "nav"
        ? "nav translate"
        : "nav"
    );
  };

  return (

    <div className={navClassName} id="nav">
      <div className= {burgerMenuClassName} 
      id="burger" onClick={burgerClick}>
        <div className="stick" id="stick1"></div>
        <div className="stick" id="stick2"></div>
        <div className="stick" id="stick3"></div>
      </div>
      <div className="nav-logo" id="nav-logo" onClick={handleItemClick}>
        <img className="nav-logo-img" alt="logo" src="/assets/logo.png" />
        <h1>FRI UNIZA</h1>
      </div>
      <div className="nav-items">
        <div className="bc-section">
          <h2>Bakalár</h2>
          <ol className="nav-list">
            <li 
              id="bc1"
              className={currentDataID === 'bc1' ? 'active nav-item' : 'nav-item'}
              onClick={handleItemClick}
            >
              1. Ročník
            </li>
            <li 
              id="bc2"
              className={currentDataID === 'bc2' ? 'active nav-item' : 'nav-item'}
              onClick={handleItemClick}
            >
              2. Ročník
            </li>
            <li 
              id="bc3"
              className={currentDataID === 'bc3' ? 'active nav-item' : 'nav-item'}
              onClick={handleItemClick}
            >
              3. Ročník
            </li>
          </ol>
        </div>
        <div className="ing-section">
          <h2>Inžinier</h2>
          <ol className="nav-list">
            <li 
              id="ing1"
              className={currentDataID === 'ing1' ? 'active nav-item' : 'nav-item'}
              onClick={handleItemClick}
            >
              1. Ročník
            </li>
            <li 
              id="ing2"
              className={currentDataID === 'ing2' ? 'active nav-item' : 'nav-item'}
              onClick={handleItemClick}
            >
              2. Ročník
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Nav;