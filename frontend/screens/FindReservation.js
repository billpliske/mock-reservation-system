//import libraries
import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import { graphql } from "react-apollo";
import { getReservationQuery, getReservationsQuery } from "../queries/queries";

// create a component
class FindReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            id: ""
        };
    }

    displayReservation() {
        var data = this.props.data;

        if (data.loading) {
            console.log("waiting for load");
        } else {
            let filteredData = data.reservations.filter(filt => {
                return filt.id === this.state.id;
            });
            console.log(filteredData);

            if (this.state.id === "") {
                return;
            } else if (filteredData[0] === this.state.data) {
                return (
                    <ErrorMessage>
                        Customer ID does not exist. Please try again.
                    </ErrorMessage>
                );
            } else {
                return data.reservations
                    .filter(res => {
                        console.log("FILTER: " + res.name);
                        return res.id === this.state.id;
                    })
                    .map(res => {
                        console.log("MAP: " + res.name);

                        if (res.name != "") {
                            return (
                                <Customer key={res.id}>
                                    <Name>{res.name}</Name>
                                    <ItemWrapperLead>
                                        <Item>
                                            <Strong>Hotel: </Strong>
                                            {res.hotelName}
                                        </Item>
                                    </ItemWrapperLead>
                                    <ItemWrapper>
                                        <Item>
                                            <Strong>Arrival date: </Strong>
                                            {res.arrivalDate}
                                        </Item>
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        <Item>
                                            <Strong>Departure date: </Strong>
                                            {res.departureDate}
                                        </Item>
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        <Item>
                                            <Strong>ID: </Strong>
                                            {res.id}
                                        </Item>
                                    </ItemWrapper>
                                </Customer>
                            );
                        } else {
                            return (
                                <Customer>
                                    <Item>No ID in our records.</Item>
                                </Customer>
                            );
                        }
                    });
            }
        }
    }

    render() {
        return (
            <Wrapper>
                <InnerView>
                    <Header>Find reservation</Header>
                    <Readout>
                        Enter a customer ID below for more details.
                    </Readout>
                    <ItemView>
                        <LabelView>
                            <Label>Your name:</Label>
                        </LabelView>
                        <StyledTextInput
                            placeholder="Enter customer ID"
                            type="text"
                            value={this.state.query}
                            onChangeText={e => this.setState({ query: e })}
                        />
                    </ItemView>
                    <Submit
                        title="Submit"
                        onPress={() => {
                            // this.checkID();
                            this.setState({
                                id: this.state.query,
                                query: ""
                            });
                        }}
                    >
                        <SubmitText>Submit</SubmitText>
                    </Submit>
                    {this.displayReservation()}
                </InnerView>
            </Wrapper>
        );
    }
}

// STYLES

const Wrapper = styled.ScrollView`
    padding: 30px;
    background-color: #455a64;
`;

const InnerView = styled.View`
    padding-bottom: 40px;
`;

const ErrorMessage = styled.Text`
    font-size: 18px;
    padding: 40px;
    color: #fff;
`;

const Header = styled.Text`
    font-family: "raleway-blackitalic";
    font-weight: normal;
    font-size: 40px;
    color: #fff;
`;

const Readout = styled.Text`
    color: #fff;
    padding: 5px 0 20px 0;
`;

const Subhead = styled.Text`
    font-family: "raleway-bold";
    font-weight: normal;
    font-size: 15px;
    letter-spacing: 4px;
    padding-top: 30px;
`;

const Customer = styled.View`
    margin: 30px 0 40px 0;
    color: #fff;
`;

const Label = styled.Text`
    color: #fff;
`;

const Name = styled.Text`
    font-family: "raleway-blackitalic";
    font-weight: normal;
    font-size: 20px;
    color: #fff;
`;

const ItemWrapper = styled.View`
    border-top-width: 1px;
    border-color: #aaa;
    padding-top: 10px;
    margin-top: 10px;
`;

const ItemWrapperLead = styled.View`
    border-top-width: 3px;
    border-color: #00334d;
    padding-top: 10px;
    margin-top: 10px;
`;

const Item = styled.Text`
    font-weight: normal;
    font-size: 15px;
    color: #d9d9d9;
`;

const Strong = styled.Text`
    font-weight: bold;
`;

const ItemView = styled.View`
    padding: 5px 0;
`;

const LabelView = styled.View`
    padding: 5px 0;
`;

const StyledTextInput = styled.TextInput`
    background-color: #fff;
    height: 50px;
    padding: 10px;
`;

const Submit = styled.TouchableOpacity`
    background-color: orange;
    padding: 15px;
    margin: 15px 0 10px 0;
    width: 40%;
`;

const SubmitText = styled.Text`
    color: #000;
    font-family: "raleway-bold";
    font-weight: normal;
    font-size: 18px;
    text-align: center;
`;

export default graphql(getReservationsQuery)(FindReservation);
