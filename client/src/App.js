import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AllUsers from "./components/AllUsers";
import Auth from "./page/Auth";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [select, setSelect] = React.useState("Posts");
  const [mainScreen, setMainScreen] = React.useState(false);
  const [admin, setAdmin] = React.useState("");
  const selectHandler = () => {
    if (select !== "Posts") setSelect("Posts");
    else setSelect("Users");
  };
  const handler = (name) => {
    setMainScreen(true);
    setAdmin(name);
  };
  const logout = () => {
    setMainScreen(false);
    setAdmin("");
    // console.log("out");
  };
  console.log(mainScreen);
  return (
    <ApolloProvider client={client}>
      <div className="App flex flex-col items-center font-poppins ">
        {mainScreen && (
          <AllUsers
            select={selectHandler}
            title={select}
            name={admin}
            logout={logout}
          />
        )}
        {!mainScreen && <Auth toggleScreen={handler} />}
      </div>
    </ApolloProvider>
  );
}

export default App;
