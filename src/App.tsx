import React, { useState } from "react";
import "./App.css";
import Signup from "./components/Signin/Signup";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

function Main() {
  return (
    <div>
      <Signup />
    </div>
  );
}


function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
