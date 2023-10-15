import React from 'react';
import './header.css';
import blockchain from '../../assets/blkchainlogo.png';

const Header = () => {
  return (
    <div className="ether__header section__padding" id="home">
      <div className="ether__header-content">
        <h1 className="gradient__text">Blockchain Transaction Information Visualization System</h1>
        <p>The system's primary goal is to present complex blockchain information in a user-friendly manner, enabling users to gain valuable insights into transaction patterns, network activity, and smart contract interactions.</p>
        <a href="#search"><span>Explore</span><i></i></a>
      </div>
      <div className="ether__header-image">
        <img src={blockchain} alt="blockchain"/>
      </div>
    </div>
  )
}

export default Header