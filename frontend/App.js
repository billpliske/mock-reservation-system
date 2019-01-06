import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import ApolloClient from "apollo-client";
import { HttpLink, InMemoryCache } from "apollo-client-preset";
import { ApolloProvider } from "react-apollo";
import styled from "styled-components";
import Router from "./Router";

// Needs actual IP here for local development, localhost will crash it
const client = new ApolloClient({
    link: new HttpLink({ uri: "http://192.168.1.7:4000/graphql" }),
    cache: new InMemoryCache().restore({})
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router />
            </ApolloProvider>
        );
    }
}

// STYLES HERE

export default App;
