import React, { Fragment } from "react";
import styled from "styled-components";
import { Blogcard } from "../../Components";
import { useQuery, gql } from "@apollo/client";
import CircleLoader from "react-spinners/ClipLoader";
import {Helmet}  from "react-helmet-async"
const BLOGS = gql`
  query Blogs {
    blogs {
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
  const { loading, error, data } = useQuery(BLOGS);
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
      <Helmet>
      <title>blog</title>
      <meta name="description" content="Read blogs about history of african art"
      />
      <link  rel="canonical" href="/blogs"/>
    </Helmet>
      <Text> Feed</Text>

      {loading ? (
        <CircleLoader
          color={"#103979"}
          // loading={loading.toString()}
          size={100}
          cssOverride={override}
        />
      ) : (
        <Blogcontainer>
          {data.blogs.data.map((blog) => (
            <Fragment key={blog.id}>
              <Blogcard blog={blog} />
            </Fragment>
          ))}
        </Blogcontainer>
      )}
    </>
  );
}
const Blogcontainer = styled.div`
  min-height: 100vh;
  background-color: #f1e7cf;
  padding: 0 1.3rem;
  margin: 0 auto;
  @media (min-width: 630px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    min-height: 100vh;
  }
`;
const Text = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
`;
export default Blogs;
