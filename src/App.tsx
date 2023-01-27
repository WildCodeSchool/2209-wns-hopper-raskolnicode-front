import React, { createContext, useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import Blog from "./pages/Blogs/Blog";
import Post from "./pages/Posts/Post";
import { GET_LOGGED_USER } from "./graphql/queries";
import Login from "./pages/Login/Login";
import { UserContext } from "./UserContext";

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
  const [user, setUser] = useState(null);
  const { data, refetch, error } = useQuery(GET_LOGGED_USER);

  useEffect(() => {
    if (error) {
      setUser(null)
    }
  }, [error])

  function onTokenChange(token?: string) {
    console.log(token)
    if (token) {
      localStorage.setItem("token", token);
      console.log("logged in");
    } else {
      localStorage.removeItem("token");
      console.log("logged out");
    }
    refetch();
  }

  useEffect(() => {
      setUser(data?.loggedUser);
  });

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout onTokenChange={onTokenChange} />}>
            {user ? (
              <></>
            ) : (
              <>
                <Route
                  path="/login"
                  element={<Login onTokenChange={onTokenChange} />}
                />
                <Route path="/signup" element={<Signup />} />
              </>
            )}

            <Route
              path="/"
              element={<Home onTokenChange={onTokenChange} />}
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/post" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
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
