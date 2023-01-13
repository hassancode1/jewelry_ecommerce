import React, { Fragment, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import CircleLoader from "react-spinners/ClipLoader";
import { ShoppingcartContext } from "../Helpers/Shoppingcart";
function CartComponent({ setCartOpen }) {
  const ApiUrl = `http://localhost:1337`;
  const {
    cartitems,
    handleRemoveProduct,
    handleRemove,
    increaseQuantity,
    setQuantity,
    calculateTotal,
  } = useContext(ShoppingcartContext);

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const override = {
    position: "absolute",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <Header>
        <Yourcart onClick={() => setCartOpen(() => false)}>
          <Backimg src="/icons/arrowback.svg" />
          <Nametext>Your Cart </Nametext>
        </Yourcart>
        {cartitems?.length > 0 ? (
          <Wrapper>
            {cartitems.map((item) => (
              <Fragment key={item.id}>
                <Container>
                  <Imagecontainer>
                    {item?.attributes.images.data.map((img) => (
                      <Fragment key={img.id}>
                        <Carditemimage src={ ApiUrl+ img.attributes.url} />
                        <Remove onClick={() => handleRemove(item)}>
                          {" "}
                          <Removeimg src="/icons/delete.svg" /> REMOVE
                        </Remove>
                      </Fragment>
                    ))}
                  </Imagecontainer>
                  <Pricediv>
                    <Nametext>{item.attributes.name} </Nametext>

                    <Text>{formatter.format(item.attributes.price)} </Text>
                    <Quantitydiv>
                      <Add
                        src="/icons/remove.svg"
                        onClick={() => handleRemoveProduct(item)}
                      />
                      <Inputvalue>{item.quantity}</Inputvalue>

                      {item.attributes.Qty <= item.quantity ? (
                        <Unadd src="/icons/add.svg" />
                      ) : (
                        <Add
                          src="/icons/add.svg"
                          onClick={() => increaseQuantity(item)}
                        />
                      )}
                    </Quantitydiv>
                  </Pricediv>
                </Container>
              </Fragment>
            ))}
            <Checkoutdiv>
              <Row>
                <Subtotal> Subtotal</Subtotal>
                <Text> {formatter.format(parseFloat(calculateTotal()))} </Text>
              </Row>
              <Link to="/checkout" onClick={() => setCartOpen(() => false)}>
                {" "}
                <Checkoutbutton>Check out</Checkoutbutton>
              </Link>
            </Checkoutdiv>
          </Wrapper>
        ) : (
          <Noitemdiv>
            <Noitem> Your cart is currently empty </Noitem>
          </Noitemdiv>
        )}
      </Header> 
    </>
  );
}
const Subtotal = styled.h3`
  font-weight: 400;
`;
const Remove = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  text-align: center;
  cursor: pointer;
  align-items: center;
`;
const Removeimg = styled.img`
  width: 21px;
  height: 21px;
`;
const Checkoutbutton = styled.button`
  border: none;
  background-color: black;
  color: white;
  width: 100%;
  padding: 0.7rem 0.7rem;
  border-radius: 10px;
  font-size: 1.1rem;
`;
const Checkoutdiv = styled.div`
  margin-top: 2rem;
`;
const Inputvalue = styled.h2`
  font-size: 1.125em;
  text-align: center;
`;
const Carditemimage = styled.img`
  width: 120px;
  /* min-width: 280px;
  max-width: 350px; */
  height: 100px;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
const Header = styled.header`
  /* display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center; */
  padding: 2rem 1.4rem;
  /* border: 1px solid red; */
  position: relative;
`;
const Backimg = styled.img`
  width: 37px;
  height: 35px;
`;
const Add = styled.img`
  width: 25px;
  height: 25px;
  padding: 10px 10px;
  border-radius: 10px;
  background-color: #68b984;
  color: white;
`;
const Unadd = styled.img`
  width: 25px;
  height: 25px;
  padding: 10px 10px;
  border-radius: 10px;
  background-color: #cffde1;
  color: white;
`;
const Yourcart = styled.div`
  position: absolute;
  top: 0;
  left: 42px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Pricediv = styled.div`
  margin: 0;
  /* display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
  width: 50%;
  text-align: center;
`;
const Quantitydiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Imagecontainer = styled.div``;
const Noitem = styled.h2`
  color: black;
  font-size: 1.4rem;
  font-weight: 500;
`;
const Noitemdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 196px;
  left: 132px;
`;
const Button = styled.button``;
const Text = styled.h2`
  color: black;
  font-size: 1.1rem;
`;
const Nametext = styled.h2`
  color: black;
  font-weight: 400;
  font-size: 1.2rem;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0 1rem 0rem;
`;
export default CartComponent;
