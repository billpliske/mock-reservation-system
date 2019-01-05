import React, { Component } from "react";
import { Text, View } from "react-native";
import ApolloClient from "apollo-client";
import { HttpLink, InMemoryCache } from "apollo-client-preset";
import { ApolloProvider } from "react-apollo";
import Reservation from "./Reservation";

const client = new ApolloClient({
    link: new HttpLink({ uri: "http://192.168.1.7:4000/graphql" }),
    cache: new InMemoryCache().restore({})
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Reservation />
            </ApolloProvider>
        );
    }
}

export default App;
