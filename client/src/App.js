import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import "./App.css";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Communication from "./pages/Communication";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SingleProject from "./pages/SingleProject";

const httpLink = new createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Login />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<SingleProject />} />
                <Route path="/communication" element={<Communication />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

