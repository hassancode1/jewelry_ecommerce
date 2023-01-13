import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import CartComponent from "./CartComponent";
import { ShoppingcartContext } from "../Helpers/Shoppingcart";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const {cartitems} = useContext(ShoppingcartContext);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
console.log(cartitems)
  return (
    <Nav className={navbar ? "active" : "navbar"}>
      <Link to="/">
        {" "}
        <Logo src="/icons/Logo 2.jpg" />
      </Link>

      <Wrap>
        <Hamburgers>
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </Hamburgers>
        <Menu isOpen={isOpen}>
          <MenuWrap>
            <MenuLink onClick={() => setIsOpen(() => false)}>
              {" "}
              <Link to="/">Home</Link>
            </MenuLink>
            {/* <MenuLink onClick={() => setIsOpen(() => false)}>
              {" "}
              <Link to="/blogs">Blog</Link>
            </MenuLink> */}
            <MenuLink onClick={() => setIsOpen(() => false)}>
              <Link to="/product">Shop</Link>
            </MenuLink>
            {/* <MenuLink onClick={() => setIsOpen(() => false)}>
              <Link to="/event">Event</Link>
            </MenuLink> */}
          </MenuWrap>
        </Menu>
        <Icon onClick={() => setCartOpen(!cartOpen)}>
          {" "}
          <Shoppingimage src="/icons/shoppingcart.svg" />
          {cartitems.length === 0 ? " ":  <Cartquantity> {cartitems.length} </Cartquantity>}
        </Icon>
        {cartOpen ? (
          <Trail>
            {" "}
            <CartComponent setCartOpen={setCartOpen} />
          </Trail>
        ) : (
          ""
        )}
      </Wrap>
    </Nav>
  );
}

export default Navbar;
const Trail = styled.div`
  /* 
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")}; */

  transform: ${({ cartOpen }) =>
    cartOpen ? "translateX(100%)" : "translateX(0)"};
  transition: 0.5s ease-in;
  width: 100%;
  /* top: 50px; */
  /* right: 0;
  height: 100vh; */
  overflow-y: scroll;

  max-width: 600px;
  position: fixed;

  top: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1001;
  margin: 0;

  body {
    background-color: black;
  }

  background-color: white;
`;
const Cartquantity = styled.span`

  font-weight: 400;
  font-size: 0.7rem;
  position: absolute;
  padding: 10px 15px;
  
  background-color: red;
  color:#ffff;
  border-radius: 50%;
  left: 29px;
`;
const Icon = styled.div`
  position: relative;
  cursor: pointer;
  top: 9px;
`;
const MenuWrap = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
`;
const Shoppingimage = styled.img`

`;
const MenuLink = styled.p`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;

  text-decoration: none;
  color: black;
  transition: all 0.3s ease-in;
  font-size: 1rem;
  a {
    text-decoration: none;
    color: black;
  }

  &:hover {
    color: #1b1b1b;
  }
`;

const Nav = styled.div`
  position: sticky;
  z-index: 1000;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #f1e7cf;
  opacity: 1;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  top: 0;
  left: 0;
  right: 0;

  @media (min-width: 800px) {
    padding: 0 4rem;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
  }
`;

const Logo = styled.img`
  /* color: black;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  a {
    color: black;
    text-decoration: none;
  } */
  width: 80px;
  height: 70px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    /* 
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")}; */
    position: fixed;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: 0.3s ease-in;
    width: 90%;
    top: 50px;
    right: 0;
    height: 100vh;
    margin: 0;
    z-index: 99;
    body {
      background-color: black;
    }

    background-color: #ffff;
  }
`;

const Hamburgers = styled.div`
  display: none;
  flex-direction: column;

  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
