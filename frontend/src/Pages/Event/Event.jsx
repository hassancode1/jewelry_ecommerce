import React, { Fragment } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import CircleLoader from "react-spinners/ClipLoader";
import {Helmet}  from "react-helmet-async"
import moment from "moment";
const EVENTS = gql`
  query Events {
    events {
      data {
        id
        attributes {
          location
          title
          date
          description
          time
        }
      }
    }
  }
`;

function Event() {
  const { loading, error, data } = useQuery(EVENTS);
 
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
      <title>events </title>
      <meta name="description" content="events of the year  "
      />
      <link  rel="canonical" href="event"/>
    </Helmet>
      <Container>
        <Backgroundimagediv>
          <Image src="/images/eventimage-.png" />
        </Backgroundimagediv>
        <EventRow>
          {loading ? (
            <CircleLoader
              color={"#103979"}
              // loading={loading.toString()}
              size={100}
              cssOverride={override}
            />
          ) : (
            data?.events.data.map((item) => (
              <Events key={item.id}>
                <Border>
                  <Eventtitle> Event title</Eventtitle>
                  <Title> {item.attributes.title}</Title>
                </Border>
                <Border>
                  <Row>
                    <Col>
                      <Eventtitle> Date</Eventtitle>
                      <Title>
                        {" "}
                        {new Date(item?.attributes.date).toDateString()}
                      </Title>
                    </Col>
                    <Col>
                      <Eventtitle> Time</Eventtitle>
                      <Titletime>
               
                        {
                        moment(item.attributes.time, ["HH:mm"]).format("hh:mm a")
                        }
                      </Titletime>
                    </Col>
                  </Row>
                </Border>
                <Eventtitle> Description</Eventtitle>
                <Paragraph> {item.attributes.description} </Paragraph>
                <Eventtitle> Location</Eventtitle>
                <Location> {item.attributes.location}</Location>
              </Events>
            ))
          )}
        </EventRow>
      </Container>
    </>
  );
}
const Container = styled.div`
  padding: 1rem 1rem;
  margin: 0 auto;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Events = styled.div`
  background-color: #ffff;
  padding: 0.8rem;
  border-radius: 6px;

  margin: 0.5rem 0 1rem 0;
  max-width: 500px;

  margin-left: 1rem;
`;
const Eventtitle = styled.h3`
  font-weight: 600;
  border-bottom: 1px solid grey;
`;
const Title = styled.h2`
  font-weight: 500;
  font-size: 1.1rem;
`;
const Titletime = styled.h2`
  font-weight: 600;
  font-size: 1.1rem;
`;
const Location = styled.h2`
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EventRow = styled.div`
  @media (min-width: 730px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
const Col = styled.div``;
const Border = styled.div`
  border-bottom: 1px solid grey;
`;
const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
`;
const Image = styled.img`
  width: 100%;
  /* min-width: 280px;*/

  /* border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); */
  @media (min-width: 700px) {
    width: 50%;
  }
`;
const Backgroundimagediv = styled.div`
  @media (max-width: 700px) {
    width: 100%;
    /* height: 30vh; */
  }
`;
export default Event;
