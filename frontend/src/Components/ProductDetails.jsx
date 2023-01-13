import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { ShoppingcartContext } from "../Helpers/Shoppingcart";
import CircleLoader from "react-spinners/ClipLoader";
import {Helmet}  from "react-helmet-async"
const GALLERY = gql`
  query Gallery($id: ID) {
    gallery(id: $id) {
      data {
        id
        attributes {
          name
          Qty
          description
          price
          updatedAt
          images {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function ProductDetails() {
  const ApiUrl = `http://localhost:1337`;
  const { id } = useParams();
  const { loading, error, data } = useQuery(GALLERY, {
    variables: { id: id },
  });

  const { handleAddProduct, cartitems, setCartitems } =
    useContext(ShoppingcartContext);
  const override = {
    position: "absolute",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    transform: "translate(-50%, -50%)",
  };

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const image = data?.gallery.data.attributes.images.data;

  return (
    <>
       <Helmet>
      <title>product detail</title>
      <meta name="description" content=" product details "
      />
      <link  rel="canonical" href={`/productdetails/${id}`}/>
    </Helmet>
      {loading ? (
        <CircleLoader
          color={"#103979"}
          //   loading={loading.toString()}
          size={100}
          cssOverride={override}
        />
      ) : (
        <ProductDetailscontainer>
          {data?.gallery.data.attributes.images.data.map((item) => (
            <Fragment key={item.id}>
              <Backgroundimagediv>
                {image?.map((img) => (
                  <Image key={img.id} src={ ApiUrl +img.attributes.url} />
                ))}
              </Backgroundimagediv>
              <Cardtext>
                <Nametext> {data?.gallery.data.attributes.name}</Nametext>
                <Row>
                  <Price>
                    {" "}
                    {formatter.format(data?.gallery.data.attributes.price)}
                  </Price>
                  {data?.gallery.data.attributes.Qty <= 0 ? (
                    <OutofStock> Out of stock</OutofStock>
                  ) : (
                    <Addtocart
                      onClick={() => handleAddProduct(data.gallery.data)}
                    >
                      {" "}
                      Add to cart
                    </Addtocart>
                  )}
                </Row>

                <ProductDescriptiondiv>
                  <Productdescriptiontitle>
                    Product description
                  </Productdescriptiontitle>
                  <Productdescription>
                    {data?.gallery.data.attributes.description}
                  </Productdescription>
                </ProductDescriptiondiv>
              </Cardtext>
            </Fragment>
          ))}
        </ProductDetailscontainer>
      )}
    </>
  );
}
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;
const Addtocart = styled.button`
  padding: 0.9rem 1rem;
  border-radius: 5px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;

  border: none;
  background-color: black;
`;
const ProductDescriptiondiv = styled.div`
  margin-top: 0.7rem;
`;
const Productdescriptiontitle = styled.h2`
  font-size: 1.3rem;
  margin: 0;
  margin-top: 0.7rem;
  font-weight: 600;
`;
const Productdescription = styled.p`
  font-size: 1rem;
  margin-top: 0.4rem;
`;
const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;
const Nametext = styled.h2`
  margin: 0;
  font-size: 2.5rem;
`;
const OutofStock = styled.h2`
 
  font-size: 1.2rem;
  background-color: #fff;
  font-weight: 600;
  padding: 0.5rem;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  &:hover {
    background-color: #bdd3e8;
    fill: white;
  }
`;
const Cardtext = styled.div`
  @media (min-width: 800px) {
    /* margin: 0 auto; */

    display: flex;
    margin-top: 3rem;

    flex-direction: column;
  }
`;
const ProductDetailscontainer = styled.div`
  padding: 1rem 1rem;
  margin: 0 auto;

  display: flex;

  flex-direction: column;
  min-height: 100vh;

  /* background-color: #bdd3e8;
  background-image: linear-gradient(62deg, #bdd3e8 0%, #fbfbfb 100%); */
  @media (min-width: 800px) {
    display: grid;

    grid-template-columns: 1.2fr 1fr;
    gap: 0.9rem;
  }
  @media (min-width: 1000px) {
    display: grid;
    padding: 1rem 2.5rem;
    grid-template-columns: 1.2fr 1fr;
    gap: 2.5rem;
  }
`;
const Image = styled.img`
  width: 100%;
  /* min-width: 280px;
  max-width: 350px; */
  height: 60%;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
const Backgroundimagediv = styled.div`
  @media (min-width: 700px) {
    width: 100%;
  }
`;

export default ProductDetails;
