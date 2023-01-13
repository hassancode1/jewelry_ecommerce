import React, { Fragment, useContext } from "react";
import { Productitem } from "../../Components";

import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import CircleLoader from "react-spinners/ClipLoader";
import {Helmet}  from "react-helmet-async"
const GALLERIES = gql`
  query Galleries {
    galleries {
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

function Product() {
  const { loading, error, data } = useQuery(GALLERIES);

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
      {" "}
      <Helmet>
      <title> shop</title>
      <meta name="description" content="shop african arts "
      />
      <link  rel="canonical" href="/product"/>
    </Helmet>
      {loading ? (
        <CircleLoader
          color={"#103979"}
          // loading={loading.toString()}
          size={100}
          cssOverride={override}
        />
      ) : (
        <>
          <Text> Shop</Text>
          <Productcontainer>
            {data?.galleries.data.map((item) => (
              <Fragment key={item.id}>
                <Productitem item={item} />
              </Fragment>
            ))}
          </Productcontainer>
        </>
      )}
    </>
  );
}
const Productcontainer = styled.div`
  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1000px) {
    display: grid;
    justify-content: center;
    margin: 0 auto;
    align-content: center;
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Text = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export default Product;
