import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Pagination, Autoplay } from "swiper";
import { useQuery, gql } from "@apollo/client";
import CircleLoader from "react-spinners/ClipLoader";
import {Helmet}  from "react-helmet-async"
const HOME = gql`
  query home {
    carousel {
      data {
        attributes {
          headertext

          carousel {
            data {
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
function Home() {
  const { loading, error, data } = useQuery(HOME);

  const ApiUrl = `http://localhost:1337`;
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
      <title>home</title>
      <meta name="description" content="untu galley were historical are documented"
      />
      <link  rel="canonical" href="/"/>
    </Helmet>
      {loading ? (
        <CircleLoader
          color={"#103979"}
          // loading={loading.toString()}
          size={100}
          cssOverride={override}
        />
      ) : (
        <Herosection>
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            className="mySwiper"
          >
            <SwiperSlide>
              {" "}
              <Backgroundimg
                src={ApiUrl +
              
                  data?.carousel.data.attributes?.carousel?.data[0]?.attributes?.url
                }
                alt="bg"
              />
              <Overlay> </Overlay>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Backgroundimg
                src={ApiUrl +
                 
                  data?.carousel.data.attributes?.carousel?.data[1]?.attributes.url
                }
                alt="bg"
              />
              <Overlay> </Overlay>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Backgroundimg
                src={ApiUrl +
                  
                  data?.carousel.data?.attributes?.carousel?.data[2]?.attributes.url
                }
                alt="bg"
              />
              <Overlay> </Overlay>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Backgroundimg
                src={ApiUrl +
             
                  data?.carousel.data.attributes?.carousel?.data[3]?.attributes.url
                }
                alt="bg"
              />
              <Overlay> </Overlay>
            </SwiperSlide>
          </Swiper>
          <Text>{data?.carousel.data.attributes.headertext}</Text>

          <GalleryDesktop>
            <Backgroundimgdesktop
              src={ApiUrl +
             
                data?.carousel.data.attributes?.carousel.data[0]?.attributes.url
              }
              alt="bg"
            />
            <Backgroundimgdesktopone
              src={ApiUrl +
              
                data?.carousel.data.attributes?.carousel.data[1]?.attributes.url
              }
              alt="bg"
            />
            <Backgroundimgdesktoptwo
              src={ApiUrl +
            
                data?.carousel.data.attributes?.carousel.data[3]?.attributes.url
              }
              alt="bg"
            />
            <Backgroundimgdesktopthree
              src={ApiUrl +
               
                data?.carousel.data.attributes?.carousel.data[2]?.attributes.url
              }
              alt="bg"
            />
          </GalleryDesktop>
        </Herosection>
      )}
      <Mainsection>
        <Explore>
          <Exploretext> Explore all ideas put into a master piece</Exploretext>

          <Explorebutton>
            {" "}
            <Link to="/product">Shop now</Link>
          </Explorebutton>
        </Explore>
        <Historyart>
          <Historyartfirst>
            <GradientBackgroundfirst></GradientBackgroundfirst>
            <HistoryText>History. Art. Exhibition.</HistoryText>
          </Historyartfirst>
          <Historyartsecond>
            <GradientBackgroundsecond></GradientBackgroundsecond>
            <HistoryText1>Untu art gallery</HistoryText1>
          </Historyartsecond>
        </Historyart>
      </Mainsection>
    </>
  );
}
const Overlay = styled.header`
  /* height: 600px;
  width: 100vw;
  background: black;
  z-index: 99;
  overflow: hidden; */
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  background: black;
`;
const GradientBackgroundsecond = styled.div`
  background-color: #85ffbd;
  background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
  padding: 1.5rem;
  @media (min-width: 768px) {
    padding: 2rem 5rem;
  }

  @media (min-width: 968px) {
    padding: 3rem 8rem;
  }
`;
const GradientBackgroundfirst = styled.div`
  background-color: #85ffbd;
  background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
  padding: 1.5rem;
  @media (min-width: 768px) {
    padding: 2rem 5rem;
  }
`;
const HistoryText1 = styled.h3`
  color: #fff;
`;
const HistoryText = styled.h3`
  color: #fff;
  width: 10%;
`;
const Historyart = styled.div`
  background-color: black;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;
const Historyartfirst = styled.div`
  @media (min-width: 968px) {
    display: flex;
    justify-content: space-around;
  }
`;
const Historyartsecond = styled.div`
  /* @media (min-width: 768px) {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-direction: row-reverse;
  } */
`;
const Exploretext = styled.h2`
  font-size: 1.6rem;
  width: 75%;
  @media (min-width: 768px) {
    width: 45%;
  }
  @media (min-width: 900px) {
    width: 30%;
  }
`;
const Explorebutton = styled.button`
  background-color: black;
  padding: 0.6rem 2rem;
  color: #ffff;
  border-radius: 5px;
  a {
    text-decoration: none;
    color: #fff;
  }
  @media (min-width: 768px) {
    width: 20%;
    padding: 0;
    height: 50px;
  }
`;
const Explore = styled.div`
  padding: 2rem;
  margin-bottom: 1.4rem;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Mainsection = styled.section`
  @media (min-width: 768px) {
    margin-top: 25rem;
  }
`;
const GalleryDesktop = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const Backgroundimgdesktopone = styled.img`
  object-fit: cover;
  width: 20%;
  position: absolute;
  right: 50%;
  top: 175px;

  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
const Backgroundimgdesktoptwo = styled.img`
  object-fit: cover;
  position: absolute;
  right: 1.5rem;
  top: 8px;
  width: 17%;

  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
const Backgroundimgdesktopthree = styled.img`
  top: 433px;
  object-fit: cover;
  width: 20%;
  position: absolute;
  height: 150px;
  left: 58%;
  transform: translate(-50%, -50%);

  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
const Backgroundimgdesktop = styled.img`
  object-fit: cover;

  width: 75%;
  position: absolute;
  right: 0;
  height: 322px;

  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
const Backgroundimg = styled.img`
  object-fit: cover;
  border-radius: 9px;
  max-width: 700px;
  width: 100%;
  height: 500px;
  color: #fff;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5));
  @media (min-width: 768px) {
    display: none;
    color: black;
  }
`;
const Herosection = styled.div`
  padding: 1em 1rem;

  /* background-color: #fbfbfb;
  background-image: linear-gradient(50deg, #bdd3e8 0%, #fbfbfb 100%); */

  display: flex;
  justify-content: center;

  flex-direction: column;
  @media (min-width: 768px) {
    padding: 0;
    position: relative;
    padding-top: 4rem;
  }
`;
const Text = styled.h1`
  text-align: center;
  position: absolute;
  height: 150px;
  left: 50%;
  font-size: 35px;
  width: 80%;
  text-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  font-family: "Playfair Display", serif;
  z-index: 98;
  transform: translate(-50%, -50%);
  color: #fff;

  @media (min-width: 768px) {
    color: black;
    position: relative;
    text-align: center;
    padding-left: 3.2rem;
    font-size: 2.5rem;
    left: 136px;
    width: 50%;
    top: 65px;
    margin-top: 1rem;
  }
  @media (min-width: 900px) {
    width: 30%;
  }
`;

export default Home;
