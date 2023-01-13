import React, { Fragment, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ShoppingcartContext } from "../../Helpers/Shoppingcart";
import { toast } from "react-toastify";
import { useMutation, gql, useQuery } from "@apollo/client";
import {Helmet}  from "react-helmet-async"
function Checkout() {
  const ApiUrl = `http://localhost:1337`;
  const { calculateTotal, cartitems, setCartitems } =
    useContext(ShoppingcartContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    fullname: "",
    phonenumber: "",
    streetaddress: "",
    stateprovince: "",
    city: "",
    country: "NIGERIA",
  });
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

  const UPDATEGALLERY = gql`
    mutation updateGallery($Qty: Int, $id: ID!) {
      updateGallery(id: $id, data: { Qty: $Qty }) {
        data {
          id
          attributes {
            Qty
          }
        }
      }
    }
  `;

  const { data } = useQuery(GALLERIES);

  const updateProductinLoop = async () => {
    for (let i = 0; i < cartitems.length; i++) {
      const currentitems = data?.galleries.data?.find(
        (prod) => prod.id === cartitems[i].id
      ).attributes.Qty;

      try {
        await updateReq({
          variables: {
            id: cartitems[i].id,
            Qty: currentitems - cartitems[i].quantity,
          },
        });
        continue;
      } catch {
        break;
      }
    }
  };

  const [updateReq] = useMutation(UPDATEGALLERY, {
    onCompleted: () => setCartitems([]),
  });
  const CREATEORDER = gql`
    mutation createOrders(
      $email: String
      $fullname: String
      $streetaddress: String
      $city: String
      $stateprovince: String
      $country: String
      $phonenumber: String
      $product_information: JSON
      $total_amount: Float
    ) {
      createOrder(
        data: {
          email: $email
          fullname: $fullname
          streetaddress: $streetaddress
          stateprovince: $stateprovince
          city: $city
          country: $country
          phonenumber: $phonenumber
          product_information: $product_information
          total_amount: $total_amount
        }
      ) {
        data {
          attributes {
            fullname
            email
            streetaddress
            stateprovince
            city
            country
            phonenumber
            product_information
            total_amount
          }
        }
      }
    }
  `;

  const productinformation = cartitems.map((item) => {
    return {
      id: item.id,
      productname: item.attributes.name,
      productprice: item.attributes.price,
      quantity: item.quantity,
    };
  });

  const [createOrder] = useMutation(CREATEORDER, {
    variables: {
      email: formState.email,
      fullname: formState.fullname,
      phonenumber: formState.phonenumber,
      streetaddress: formState.streetaddress,
      stateprovince: formState.stateprovince,
      city: formState.city,
      country: formState.country,
      total_amount: calculateTotal(),
      product_information: productinformation,
    },
    onCompleted: () => updateProductinLoop(),
  });
  const { email, fullname, stateprovince, streetaddress, country, city } =
    formState;

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: calculateTotal() * 100,
    publicKey:process.env.REACT_APP_PAYSTACK_KEY
  };
  const onSuccess = (reference) => {
    createOrder();

    navigate("/thankyou");
  };


  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const componentProps = {
    ...config,
    text: "Purchase",
    onSuccess: (reference) => onSuccess(),
    onClose: onClose(),
  };

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const schema = yup.object().shape({
    fullName: yup.string().required("Your Full Name is Required!"),
    email: yup.string().email().required(),
    stateprovince: yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
     <Helmet>
      <title>checkout</title>
      <meta name="description" content=" check out page   "
      />
      <link  rel="canonical" href="/checkout"/>
    </Helmet>
      <Container>
        <Form onSubmit={handleSubmit()}>
          <Wrapper>
            <Contactinfo>
              <Titles> Contact info</Titles>
              <Inputdiv>
                <Label>
                  {" "}
                  Email <Span>*</Span>
                </Label>
                <Input
                  placeholder="example@gmail.com"
                  $style={errors.email ? { borderColor: "	#880808" } : ""}
                  type="email"
                  {...register("email", {
                    onChange: (e) => {
                      setFormState({
                        ...formState,
                        email: e.target.value,
                      });
                    },
                  })}
                />
              </Inputdiv>
            </Contactinfo>
            <Shippinginfo>
              <Titles> Shipping Address</Titles>
              <Inputdiv>
                <Label>
                  Full Name <Span>*</Span>
                </Label>
                <Input
                  $style={errors.fullName ? { borderColor: "	#880808" } : ""}
                  {...register("fullName", {
                    onChange: (e) => {
                      setFormState({
                        ...formState,
                        fullname: e.target.value,
                      });
                    },
                  })}
                />
              </Inputdiv>
              <Inputdiv>
                <Label>
                  Street Address <Span>*</Span>
                </Label>
                <Input
                  $style={errors.street ? { borderColor: "	#880808" } : ""}
                  {...register("street", {
                    onChange: (e) => {
                      setFormState({
                        ...formState,
                        streetaddress: e.target.value,
                      });
                    },
                  })}
                />
              </Inputdiv>
              <Inputdiv>
                <Label>
                  City <Span>*</Span>
                </Label>
                <Input
                  $style={errors.city ? { borderColor: "	#880808" } : ""}
                  {...register("city", {
                    onChange: (e) => {
                      setFormState({
                        ...formState,
                        city: e.target.value,
                      });
                    },
                  })}
                />
              </Inputdiv>
              <Inputdiv>
                <Label>
                  State/province <Span>*</Span>
                </Label>
                <Input
                  $style={
                    errors.stateprovince ? { borderColor: "	#880808" } : ""
                  }
                  {...register("stateprovince", {
                    onChange: (e) => {
                      setFormState({
                        ...formState,
                        stateprovince: e.target.value,
                      });
                    },
                  })}
                />
              </Inputdiv>
              <Inputdiv>
                <Label>Phone number</Label>
                <Input
                  type="number"
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      phonenumber: e.target.value,
                    })
                  }
                />
              </Inputdiv>
              <Inputdiv>
                <Label>
                  Country <Span>*</Span>
                </Label>
                <Input
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      country: e.target.value,
                    })
                  }
                  value="NIGERIA"
                />
              </Inputdiv>
            </Shippinginfo>
          </Wrapper>
          <Orderdiv>
            <OrderSummary>
              <Titles> OrderSummary</Titles>
              <Totaldiv>
                <Ordertitle>Sub Total</Ordertitle>{" "}
                <Ordertitle>{formatter.format(calculateTotal())}</Ordertitle>
              </Totaldiv>
              <Totaldiv>
                <Label>Total</Label>{" "}
                <Label>{formatter.format(calculateTotal())}</Label>{" "}
              </Totaldiv>
            </OrderSummary>

            {!isValid ? (
              <PayDisabled type="submit" > Purchase </PayDisabled>
            ) : (
              <PaystackButton className="Paybtn" {...componentProps} />
            )}
          </Orderdiv>
        </Form>
      </Container>
    </>
  );
}
const PayDisabled = styled.button`
  padding: 1rem 1rem;
  width: 100%;
  border: none;
  background-color: gray;
  border-radius: 10px;

  font-size: 1rem;
  color: white;
  display: flex;
  margin: 0.5rem auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  font-size: 0.9rem;
`;
const Totaldiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Orderdiv = styled.div`
  @media (min-width: 768px) {
    width: 100%;
  }
`;
const Form = styled.form`
display: flex;
flex-direction:column;
@media (min-width: 768px) {
  flex-direction:row;
  }
`;
const Titles = styled.h4`
  border-style: none none solid;
  border-bottom-color: #201916;
  border-width: 1px;
  font-weight: 300;
  margin: 0.9rem 0 0 0;
  font-size: 1.4em;
  font-family: "Playfair Display", serif;
  @media (min-width: 768px) {
    font-size: 1.6em;
  }
`;
const OrderSummary = styled.div`
  padding: 20px;
  background-color: white;
  /* display: flex;
  justify-content: center; */
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-top: 1rem;
`;
const Label = styled.label`
  font-size: 1.1em;
  font-weight: 600;
  margin: 1rem 0 0 0;
  @media (min-width: 800px) {
    font-size: 1.2em;
  }
`;
const Ordertitle = styled.label`
  font-size: 1em;
  font-weight: 300;
  margin: 1rem 0 0 0;
  @media (min-width: 800px) {
    font-size: 1.2em;
  }
`;

const Input = styled.input`
  background-color: #fafafa;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #ddd;
  font-size: 1rem;
  outline: none;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: #ddd;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: #ddd;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: block;
  /* height: 38px; */
  line-height: 20px;
  margin-bottom: 16px;
  padding-top: 8px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-left: 12px;
  width: 80%;
  ${(props) => props.$style ?? {}}
`;
const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Contactinfo = styled.div`
  padding: 20px;
`;
const Shippinginfo = styled.div`
  padding: 20px;
`;
const Container = styled.div`
  /* background-color: white; */

  min-height: 100vh;
  padding: 2rem 1rem;
  max-width: 800px;

  @media (min-width: 768px) {
   

    margin: 0 auto;
  }
`;
const ErrorInput = styled.input`
  border-color: red;
`;
const Wrapper = styled.div`
  background-color: white;
  /* display: flex;
  justify-content: center; */
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-right: 1rem;
  /* align-items: center;
  margin: 0 auto; */

  @media (min-width: 768px) {
    width: 100%;
  }
`;
export default Checkout;
