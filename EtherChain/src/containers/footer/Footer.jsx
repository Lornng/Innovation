import React from 'react';
import './footer.css';
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <div className="ether__footer section__padding" id="details">
      <div className="ether__footer-links">
        <div className="ether__footer-links_logo">
          <img src={logo} alt="logo" />
          <p>Transaction Information Visualization</p>
        </div>
        <div className="ether__footer-links_div">
            <h4>Our Group Members</h4>
            <ul>
              <li>
                <a href="mailto:103840759@student.swin.edu.au">103840759 - Jian Jia Ng</a>
              </li>
              <li>
                <a href="mailto:103792850@student.swin.edu.au">103792850 - Kim Duong Pham</a>
              </li>
              <li>
                <a href="mailto:102764065@student.swin.edu.au">102764065 - Garrich Farrell Hardjojuwono</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Footer