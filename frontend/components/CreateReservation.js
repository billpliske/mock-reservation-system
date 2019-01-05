//import libraries
import React, { Component } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { graphql, compose } from "react-apollo";
import styled from "styled-components";
import { Formik } from "formik";
import { addReservationMutation } from "../queries/queries";

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

    submitForm(e) {
        e.preventDefault();
        // use the addReservationMutation
        this.props.addReservationMutation({
            variables: {
                name: this.state.name,
                hotelName: this.state.hotelName,
                arrivalDate: this.state.arrivalDate,
                departureDate: this.state.departureDate
            },
            refetchQueries: [{ query: getReservationsQuery }]
        });
        // document.getElementById("add-reservation").reset();
        // document.querySelector("input").focus();
    }
    render() {
        console.log(this.state);

        return (
            <StyledView>
                <View>
                    <Text>Your name:</Text>
                    <StyledTextInput
                        type="text"
                        onChangeText={e => this.setState({ name: e })}
                    />
                </View>
                <View>
                    <Text>Hotel Name:</Text>
                    <StyledTextInput
                        type="text"
                        onChangeText={e => this.setState({ hotelName: e })}
                    />
                </View>
                <View>
                    <Text>Arrival Date:</Text>
                    <StyledTextInput
                        type="text"
                        onChangeText={e => this.setState({ arrivalDate: e })}
                    />
                </View>
                <View>
                    <Text>Departure Date:</Text>
                    <StyledTextInput
                        type="text"
                        onChangeText={e => this.setState({ departureDate: e })}
                    />
                </View>

                <Submit
                    title="Submit"
                    type="submit"
                    onPress={() => {
                        this.submitForm.bind(this);
                    }}
                >
                    <Text>Submit</Text>
                </Submit>
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

export default compose(
    graphql(addReservationMutation, { name: "addReservationMutation" })
)(CreateReservation);
