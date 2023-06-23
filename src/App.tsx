import React, { useEffect, useState } from "react";
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
import CreateBlog from "./pages/Blogs/CreateBlog";
import Post from "./pages/Posts/Post";
import { GET_LOGGED_USER } from "./graphql/queries";
import Login from "./pages/Login/Login";
import { UserContext } from "./UserContext";
import Privacy from "./pages/Home/Privacy";
import SuperAdminSignup from "./pages/Signup/SuperAdmin";
import Profile from "./pages/Profile/Profile";
import API_URL from "./config";
import CreatePost from "./pages/Posts/CreatePost";
import EditBlog from "./pages/EditBlog/EditBlog";
import EditPost from "./pages/Posts/EditPost";
import ConditionGeneral from "./pages/Home/ConditionGeneral";
import Mentions from "./pages/Home/Mentions";

const httpLink = createHttpLink({
  uri: API_URL,
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
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
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
    setUser(data?.loggedUser);
  }, [data]);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout onTokenChange={onTokenChange} />}>
            {user ? (
              <>
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/updateblog/:blogid" element={<EditBlog />} /> */}
              </>
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
            <Route path="/" element={<Home />} />
            {user && <Route path="/blog/create" element={<CreateBlog />} />}
            <Route path="/blog/:blogId" element={<Blog />} />
            <Route
              path="/blog/:blogId/nouvel-article"
              element={<CreatePost />}
            />
            <Route
              path="/blog/:blogId/articles/:postId/modifier"
              element={<EditPost />}
            />

            <Route path="/blog/:blogId/modifier" element={<EditBlog />} />

            <Route path="/blog/:blogId/articles/:postId" element={<Post />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/condition" element={<ConditionGeneral />} />
            <Route path="/mentions" element={<Mentions />} />
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
