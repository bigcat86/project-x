import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import "./App.css";
import NavBar from "./components/NavBar";
import LoginHeader from "./components/LoginHeader";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App container-fluid">
          <div className="row">
            <div className="NavBar col-3">
              <NavBar />
            </div>
            <div className="col-9">
              <LoginHeader />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Landing />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

