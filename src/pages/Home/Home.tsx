import React, { useContext } from "react";
import { UserContext } from "../../UserContext";

const Home = (props: { onTokenChange: (token?: string) => void}) => {
  
  // Getting current user from context
  const user = useContext(UserContext)

  return (
    <div>
      <h1>Welcome to StarBlog { user && user.email }</h1>
    </div>
  );
};

export default Home;
