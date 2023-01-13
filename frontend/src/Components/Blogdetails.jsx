import React, { Fragment } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import CircleLoader from "react-spinners/ClipLoader";
import {Helmet}  from "react-helmet-async"
const BLOG = gql`
  query Blog($id: ID) {
    blog(id: $id) {
      data {
        id
        attributes {
          title
          body
          date
          updatedAt
          image {
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
function Blogs() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(BLOG, {
    variables: { id: id },
  });
  const ApiUrl = `http://localhost:1337`;
  const override = {
    position: "absolute",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    transform: "translate(-50%, -50%)",
  };
  const date = new Date(data?.blog.data.attributes.date).toDateString();

  return (
    <>
      <Helmet>
      <title>home</title>
      <meta name="description" content="untu galley were historical are documented"
      />
      <link  rel="canonical" href={`/feed/${id}`}/>
    </Helmet>
      {loading ? (
        <CircleLoader
          color={"#103979"}
          // loading={loading.toString()}
          size={100}
          cssOverride={override}
        />
      ) : (
        <Blogcontainer>
          <Imagediv>
            <Image
              src={ data.blog.data.attributes.image.data.attributes.url}
            />
          </Imagediv>
          <Textdiv>
            <Title>{data.blog.data.attributes.title}</Title>
            <Datetext>{date}</Datetext>
            <Body> {data.blog.data.attributes.body}</Body>
          </Textdiv>
        </Blogcontainer>
      )}
    </>
  );
}
const Blogcontainer = styled.div`
  min-height: 100vh;
  background-color: #f1e7cf;
  padding: 1.3rem 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;
const Textdiv = styled.div`
  max-width: 700px;
`;
const Imagediv = styled.div`
  max-width: 700px;
  @media (min-width: 700px) {
    width: 800px;
  }
`;
const Image = styled.img`
  width: 100%;

  height: 60%;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: #000;
  font-family: "Playfair Display", serif;
`;
const Datetext = styled.h3`
  color: #334155;
`;
const Body = styled.p`
  font-size: 1.125rem;
  line-height: 1.7777778;
  font-weight: 500;
  color: #000000;
  word-wrap: break-word;
`;
export default Blogs;
