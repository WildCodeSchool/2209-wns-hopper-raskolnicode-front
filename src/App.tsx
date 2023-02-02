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
import CreateBlog from "./pages/Blogs/createBlog";
import Post from "./pages/Posts/Post";
import { GET_LOGGED_USER } from "./graphql/queries";
import Login from "./pages/Login/Login";
import { UserContext } from "./UserContext";
import Privacy from "./pages/Home/Privacy";
import SuperAdminSignup from "./pages/Signup/SuperAdmin";

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
      setUser(null);
    }
  }, [error]);

  async function onTokenChange(token?: string) {
    // console.log(token)
    if (token) {
      localStorage.setItem("token", token);
      console.log("logged in");
    } else {
      localStorage.removeItem("token");
      console.log("logged out");
    }
    console.log("refetching");
    try {
      const { data } = await refetch();
      setUser(data?.loggedUser);
    } catch (err: any) {
      if (err.message.includes("Access denied!")) {
        setUser(null);
      }
    }
  }

  useEffect(() => {
    console.log("useEffect loggedUser", data?.loggedUser);
    setUser(data?.loggedUser);
  }, [data]);

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
                <Route
                  path="/super-admin"
                  element={<SuperAdminSignup />}
                ></Route>
              </>
            )}

            <Route path="/" element={<Home onTokenChange={onTokenChange} />} />
            <Route path="/blog/:blogId" element={<Blog />} />
            <Route path="/post" element={<Post />} />
            <Route path="/privacy" element={<Privacy />} />
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
