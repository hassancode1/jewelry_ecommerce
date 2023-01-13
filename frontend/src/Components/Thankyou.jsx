import React, { Fragment } from "react";
import styled from "styled-components";

function Thankyou() {
  return (
    <>
      <Container>
        <MainTitle> Thank You.</MainTitle>
        <Title>Your order was completed</Title>
        <Row>
          <Emailsent src="/icons/emailsent.svg" />
          <Body>
            An email reciept including the details about your order has been
            sent to the email address provided. Please keep it to your records
          </Body>
        </Row>
      </Container>
    </>
  );
}
const Container = styled.div`
  min-height: 100vh;
  background-color: #f1e7cf;
  padding: 0 2.3rem;
  margin: 0 auto;
  text-align: center;
  max-width: 768px;
`;
const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  /* margin: 0; */
`;
const Title = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Emailsent = styled.img`
  width: 70px;
  height: 50px;
`;
const Body = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
`;
export default Thankyou;
 