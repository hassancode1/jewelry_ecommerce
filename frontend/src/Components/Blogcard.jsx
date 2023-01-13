import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
function Blogcard({ blog }) {
  const ApiUrl = `http://localhost:1337`;
  const date = new Date(blog.attributes.date).toDateString();
  return (
    <Blogcontainer>
      <Blogitemimage src={ blog?.attributes?.image.data?.attributes.url} />

      <Title>{blog.attributes.title}</Title>
      <Blogdate>{date}</Blogdate>
      <Blogsubtitle>{blog.attributes.body.substring(0, 200)}</Blogsubtitle>
      <Nextlink>
        <Link to={`/feed/${blog.id}`}>Keep reading</Link>
      </Nextlink>
    </Blogcontainer>
  );
}
const Blogitemimage = styled.img`
  max-width: 400px;
  width: 100%;

  min-height: 268px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-family: "Playfair Display", serif;
  margin-top: 0.3rem;
  color: black;
`;
const Text = styled.h2`
  font-size: 23px;
  margin-top: 0.2rem;
`;
const Nextlink = styled.p`
  text-align: left;
  text-decoration: underline;
  font-size: 18px;
  margin-top: 1.2rem;

  text-align: left;
  a {
    color: black;
  }
`;
const Blogdate = styled.h3`
  color: #334155;
  text-align: left;
  margin-top: 0.2rem;
`;

const Blogsubtitle = styled.p`
  line-height: 1.5;

  font-size: 1rem;
  margin: 0;
  text-align: left;
`;
const Blogcontainer = styled.article`
  padding: 1rem 1rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background-color: #f1e7cf;
  flex-direction: column;

  /* box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); */
`;
export default Blogcard;
