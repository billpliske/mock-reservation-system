//import libraries
import React, { Component } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { graphql, compose, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { Formik } from "formik";
// import { addReservationMutation } from "../queries/queries";

const addReservation = gql`
    mutation addReservation(
        $name: String!
        $hotelName: String!
        $arrivalDate: String!
        $departureDate: String!
    ) {
        addReservation(
            name: $name
            hotelName: $hotelName
            arrivalDate: $arrivalDate
            departureDate: $departureDate
        ) {
            id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
`;

// create a component
class CreateReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            hotelName: "",
            arrivalDate: "",
            departureDate: ""
        };
    }

    // submitForm(e) {
    //     e.preventDefault();
    //     // use the addReservationMutation
    //     this.props.addReservation({
    //         variables: {
    //             name: this.state.name,
    //             hotelName: this.state.hotelName,
    //             arrivalDate: this.state.arrivalDate,
    //             departureDate: this.state.departureDate
    //         },
    //         refetchQueries: [{ query: getReservationsQuery }]
    //     });
    //     // document.getElementById("add-reservation").reset();
    //     // document.querySelector("input").focus();
    // }
    render() {
        console.log(this.state);

        return (
            <StyledView>
                <Mutation mutation={addReservation}>
                    {(addReservationMutation, { data }) => (
                        <StyledView>
                            <View>
                                <Text>Your name:</Text>
                                <StyledTextInput
                                    type="text"
                                    value={this.state.name}
                                    onChangeText={e =>
                                        this.setState({ name: e })
                                    }
                                />
                            </View>
                            <View>
                                <Text>Hotel Name:</Text>
                                <StyledTextInput
                                    type="text"
                                    value={this.state.hotelName}
                                    onChangeText={e =>
                                        this.setState({ hotelName: e })
                                    }
                                />
                            </View>
                            <View>
                                <Text>Arrival Date:</Text>
                                <StyledTextInput
                                    type="text"
                                    value={this.state.arrivalDate}
                                    onChangeText={e =>
                                        this.setState({ arrivalDate: e })
                                    }
                                />
                            </View>
                            <View>
                                <Text>Departure Date:</Text>
                                <StyledTextInput
                                    type="text"
                                    value={this.state.departureDate}
                                    onChangeText={e =>
                                        this.setState({ departureDate: e })
                                    }
                                />
                            </View>

                            <Submit
                                title="Submit"
                                onPress={() => {
                                    addReservationMutation({
                                        variables: {
                                            name: this.state.name,
                                            hotelName: this.state.hotelName,
                                            arrivalDate: this.state.arrivalDate,
                                            departureDate: this.state
                                                .departureDate
                                        }
                                    })
                                        .then(res => res)
                                        .catch(err => <Text>{err}</Text>);
                                    this.setState({
                                        name: "",
                                        hotelName: "",
                                        arrivalDate: "",
                                        departureDate: ""
                                    });
                                }}
                            >
                                <Text>Submit</Text>
                            </Submit>
                        </StyledView>
                    )}
                </Mutation>
            </StyledView>
        );
    }
}

const StyledView = styled.View`
    background-color: #ccc;
`;

const StyledTextInput = styled.TextInput`
    background-color: #fff;
`;

const Submit = styled.TouchableOpacity`
    background-color: gray;
    color: white;
    padding: 30px;
`;

export default CreateReservation;
