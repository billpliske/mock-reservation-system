import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import ApolloClient from "apollo-client";
import { HttpLink, InMemoryCache } from "apollo-client-preset";
import { ApolloProvider } from "react-apollo";
import styled from "styled-components";
import RouterWrapper from "./Router";

// Needs actual IP here for local development, localhost will crash it
const client = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:4001/graphql" }),
    cache: new InMemoryCache().restore({})
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <RouterWrapper />
            </ApolloProvider>
        );
    }
}

// STYLES HERE

export default App;
