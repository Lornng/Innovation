import React, {useState} from 'react'
import './navbar.css'
import { IoIosMenu, IoMdClose } from "react-icons/io";
import logo from '../../assets/logo.png'

const Menu = () => (
  <>
    <p><a href="#home">Home</a></p>
    <p><a href="#about">About</a></p>
    <p><a href="#search">Search</a></p>
    <p><a href="#visualization">Visualization</a></p>
    <p><a href="#details">Contacts</a></p>
  </>
)

const Navbar = () => {
  const [mobileMenu, setMenuState] = useState(false);

  return (
    <div className="ether__navbar">
      <div className="ether__navbar-links">
        <div className="ether__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="ether__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="ether__navbar-login">
        <p><a href="#login">Login</a></p>
        <button type="button">Sign Up</button>
      </div>
      <div className="ether__navbar-menu">
        {mobileMenu
          ? <IoMdClose color="#fff" size={50} onClick={() => setMenuState(false)} />
          : <IoIosMenu color="#fff" size={50} onClick={() => setMenuState(true)} />
        }
        {mobileMenu && (
          <div className="ether__navbar-menu_container scale-up-center">
            <div className="ether__navbar-menu_container-links">
              <Menu />
              <div className="ether__navbar-menu_container-links-login">
                <p>Login</p>
                <button type="button">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar