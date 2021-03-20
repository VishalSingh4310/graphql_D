import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AllUsers from "./components/AllUsers";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [select, setSelect] = React.useState("Posts");
  const selectHandler = () => {
    if (select !== "Posts") setSelect("Posts");
    else setSelect("Users");
  };
  return (
    <ApolloProvider client={client}>
      <div className="App flex flex-col items-center font-poppins ">
        <AllUsers select={selectHandler} title={select} />
      </div>
    </ApolloProvider>
  );
}

export default App;
