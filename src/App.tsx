import React, { useState } from "react";
import "./App.css";
import Signin from "./components/Signin/Signin";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

function Main() {
  return (
    <div>
      <Signin />
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
