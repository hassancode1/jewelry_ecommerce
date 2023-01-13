import { Routes, Route, Router } from "react-router-dom";
import { Home } from "./Pages";
import React, { useState, useEffect } from "react";
import { Blogs } from "./Pages";
import { Product } from "./Pages";
import { Checkout } from "./Pages";
import { Navbar } from "./Components";
import { Event } from "./Pages";
import { ProductDetails } from "./Components";
import { Blogdetails } from "./Components";
import { Thankyou } from "./Components";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Shoppingcart from "./Helpers/Shoppingcart";


import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink ,ApolloProvider} from '@apollo/client'




// //WEB SERVER  
// const httpLink = createHttpLink({
//   uri:process.env.REACT_APP_API_URL
// });

 
// const authLink = setContext((_, { headers }) => {
//   const token = process.env.REACT_APP_TOKEN
//   return {
//       headers: {
//           ...headers,
//           authorization:token,
//           "Content-Type": "application/json",
//       }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink), 
//      credentials: 'same-origin',
//   cache: new InMemoryCache(),
// });

// LOCAL CONNECTION
const client = new ApolloClient({
  link: new  createHttpLink({
    uri: 'http://localhost:1337/graphql',
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Shoppingcart>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            {/* <Route exact path="/blogs" element={<Blogs />}></Route> */}
            <Route exact path="/product" element={<Product />}></Route>
            {/* <Route exact path="/event" element={<Event />}></Route> */}
            <Route exact path="/checkout" element={<Checkout />}></Route>
            <Route exact path="/thankyou" element={<Thankyou />}></Route>
            <Route
              exact
              path="productdetails/:id"
              element={<ProductDetails />}
            ></Route>
            <Route exact path="feed/:id" element={<Blogdetails />}></Route>
          </Routes>
        </div>

        <ToastContainer />
      </Shoppingcart>
    </ApolloProvider>
  );
}

export default App;
