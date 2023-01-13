import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { ShoppingcartContext } from "../Helpers/Shoppingcart";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Productitem({ item }) {
  const ApiUrl = `http://localhost:1337`;
  const { handleAddProduct, cartitems } = useContext(ShoppingcartContext);

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <Cardcontainer>
      <Cardsection>
        <Cardimage>
          {item?.attributes.images.data.map((img, i) => (
            <Fragment key={i}>
              <Link to={`/productdetails/${item.id}`}>
                <Carditemimage src={ ApiUrl+img.attributes.url} />
              </Link>
            </Fragment>
          ))}
          {item.attributes.Qty <= 0 ? <OutofStock> Out of stock</OutofStock> :   <Addtocart
            src="/icons/addtocart.svg"
            onClick={() => handleAddProduct(item)}
          />}
         
        </Cardimage>
      </Cardsection>
      <Cardtext>
        {" "}
        <Description>
          {" "}
          <Link to={`/productdetails/${item.id}`}>
            {item.attributes.description}{" "}
          </Link>
        </Description>{" "}
        <Price> {formatter.format(item.attributes.price)}</Price>
      </Cardtext>
    </Cardcontainer>
  );
}

const Imagediv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Cardtext = styled.div`
  height: 10%;
`;
const Description = styled.span`
  font-size: 1rem;
  margin: 0;
  cursor: pointer;
  display: block;

  &:hover {
    text-decoration: underline;
    color: #5c64ff;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;
const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;
const Addtocart = styled.img`
  position: absolute;
  bottom: 70px;
  right: 17px;
  width: 33px;
  background-color: #fff;
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  &:hover {
    background-color: #bdd3e8;
    fill: white;
  }
`;
const Carditemimage = styled.img`
  width: 100%;
  /* min-width: 280px;
  max-width: 350px; */
  height: 268px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
const Cardsection = styled.div`
  min-width: 320px;
`;
const OutofStock = styled.h2`
 position: absolute;
    bottom: 61px;
    right: 17px;
    font-size: 1rem;
    background-color: #fff;
    font-weight: 600;
    padding: 0.5rem;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  &:hover {
    background-color: #bdd3e8;
    fill: white;
  }
`
const Cardimage = styled.div`
  height: 85%;
  width: 100%;
`;
const Cardcontainer = styled.div`
  padding: 1rem 1rem;
  margin: 0 auto;
/* 
  display: flex;
  justify-content: center;
  flex-direction: column;
 
  text-align: center*/
  justify-content: center;
  height: 325px; 
display: grid;
position: relative;
grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
  /* box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); */
`;

export default Productitem;
