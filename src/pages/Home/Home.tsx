import React from "react";
import { IUser } from "../../interfaces";

const Home = (props: { user: IUser | null, onTokenChange: (token?: string) => void}) => {
  return (
    <div>
      <h1>Welcome to StarBlog</h1>
      { props.user ? <button onClick={() => props.onTokenChange()}>Se déconnecter</button> : <a href="/login">Me connecter</a> }
    </div>
  );
};

export default Home;
