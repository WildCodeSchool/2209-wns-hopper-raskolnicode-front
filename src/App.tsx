import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, useQuery } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import Blog from "./pages/Blogs/Blog";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn/SignIn";
import { GET_LOGGED_USER } from "./graphql/queries";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Main() {
  const [user, setUser] = useState(null)

  const { data, refetch } = useQuery(GET_LOGGED_USER)

  function onTokenChange(token?: string) {
    if (token) {
      localStorage.setItem('token', token)
      console.log('logged in')
    } else {
      localStorage.removeItem('token')
      console.log('logged out')
    }
    refetch()
  }

  useEffect(() => {
    if (data && data.loggedUser) {
      setUser(data.loggedUser)
    } else {
      setUser(null)
    }
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/signin" element={<SignIn user={user} onTokenChange={onTokenChange} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home user={user} onTokenChange={onTokenChange} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
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

