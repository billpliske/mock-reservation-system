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
import DatePicker from "react-native-datepicker";
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
        // console.log(this.state);

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
                            <DateWrapper>
                                <DateView>
                                    <LabelView>
                                        <Label>Arrival Date:</Label>
                                    </LabelView>

                                    <DatePicker
                                        mode="date"
                                        date={this.state.arrivalDate}
                                        placeholder="Select Date"
                                        format="M-DD-YYYY"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: "absolute",
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 36,
                                                backgroundColor: "#fff",
                                                padding: 5
                                            }
                                        }}
                                        onDateChange={e =>
                                            this.setState({
                                                arrivalDate: e
                                            })
                                        }
                                    />
                                </DateView>
                                <DateView>
                                    <LabelView>
                                        <Label>Departure Date:</Label>
                                    </LabelView>
                                    <DatePicker
                                        mode="date"
                                        date={this.state.departureDate}
                                        placeholder="Select Date"
                                        format="M-DD-YYYY"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: "absolute",
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 36,
                                                backgroundColor: "#fff",
                                                padding: 5
                                            }
                                        }}
                                        onDateChange={e =>
                                            this.setState({
                                                departureDate: e
                                            })
                                        }
                                    />
                                </DateView>
                            </DateWrapper>

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

const DateWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const DateView = styled.View`
    padding: 5px 30px 5px 0;
`;

const LabelView = styled.View`
    padding: 5px 0;
`;

const Label = styled.Text`
    color: #fff;
`;

const StyledTextInput = styled.TextInput`
    background-color: #fff;
    height: 50px;
    padding: 10px;
`;

const Submit = styled.TouchableOpacity`
    background-color: orange;
    padding: 15px;
    margin-top: 30px;
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
