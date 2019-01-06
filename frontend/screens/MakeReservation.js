//import libraries
import React, { Component } from "react";
import {
    ScrollView,
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity
} from "react-native";
import { graphql, compose, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { getReservationsQuery } from "../queries/queries";

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
class MakeReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            hotelName: "",
            arrivalDate: "",
            departureDate: ""
        };
    }

    render() {
        console.log(this.state);

        return (
            <StyledBackground>
                <Header>Make a reservation</Header>
                <Mutation
                    mutation={addReservation}
                    refetchQueries={[{ query: getReservationsQuery }]}
                >
                    {(addReservationMutation, { data }) => (
                        <StyledView>
                            <ItemView>
                                <LabelView>
                                    <Label>Your name:</Label>
                                </LabelView>
                                <StyledTextInput
                                    type="text"
                                    value={this.state.name}
                                    onChangeText={e =>
                                        this.setState({ name: e })
                                    }
                                />
                            </ItemView>
                            <ItemView>
                                <LabelView>
                                    <Label>Hotel Name:</Label>
                                </LabelView>
                                <StyledTextInput
                                    type="text"
                                    value={this.state.hotelName}
                                    onChangeText={e =>
                                        this.setState({ hotelName: e })
                                    }
                                />
                            </ItemView>
                            <ItemView>
                                <LabelView>
                                    <Label>Arrival Date:</Label>
                                </LabelView>
                                <StyledTextInput
                                    type="text"
                                    value={this.state.arrivalDate}
                                    onChangeText={e =>
                                        this.setState({ arrivalDate: e })
                                    }
                                />
                            </ItemView>
                            <ItemView>
                                <LabelView>
                                    <Label>Departure Date:</Label>
                                </LabelView>
                                <StyledTextInput
                                    type="text"
                                    value={this.state.departureDate}
                                    onChangeText={e =>
                                        this.setState({ departureDate: e })
                                    }
                                />
                            </ItemView>

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
                                <SubmitText>Submit</SubmitText>
                            </Submit>
                        </StyledView>
                    )}
                </Mutation>
            </StyledBackground>
        );
    }
}

const StyledBackground = styled.ScrollView`
    background-color: #36474f;
    padding: 30px;
`;

const Header = styled.Text`
    font-family: "raleway-blackitalic";
    font-weight: normal;
    font-size: 40px;
    line-height: 44px;
    color: #fff;
`;

const StyledView = styled.View`
    background-color: #36474f;
    padding-top: 10px;
`;

const ItemView = styled.View`
    padding: 5px 0;
`;

const LabelView = styled.View`
    padding: 5px 0;
`;

const Label = styled.Text`
    color: #fff;
`;

const StyledTextInput = styled.TextInput`
    background-color: #fff;
`;

const Submit = styled.TouchableOpacity`
    background-color: orange;
    padding: 20px;
    margin-top: 20px;
    width: 50%;
`;

const SubmitText = styled.Text`
    color: #000;
    font-family: "raleway-bold";
    font-weight: normal;
    font-size: 20px;
    text-align: center;
`;

export default MakeReservation;
