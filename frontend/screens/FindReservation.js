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
            id: "5c30021111ca464eec96fbe3"
        };
    }

    displayReservation() {
        var data = this.props.data;

        if (data.loading) {
            return <Text>Loading reservations...</Text>;
        } else {
            return data.reservations
                .filter(res => {
                    return res.id === this.state.id;
                })
                .map(reservation => {
                    return (
                        <Customer
                            key={reservation.id}
                            onClick={e =>
                                this.setState({ selected: reservation.id })
                            }
                        >
                            <Name>{reservation.name}</Name>
                            <ItemWrapperLead>
                                <Item>
                                    <Strong>Hotel: </Strong>
                                    {reservation.hotelName}
                                </Item>
                            </ItemWrapperLead>
                            <ItemWrapper>
                                <Item>
                                    <Strong>Arrival date: </Strong>
                                    {reservation.arrivalDate}
                                </Item>
                            </ItemWrapper>
                            <ItemWrapper>
                                <Item>
                                    <Strong>Departure date: </Strong>
                                    {reservation.departureDate}
                                </Item>
                            </ItemWrapper>
                            <ItemWrapper>
                                <Item>
                                    <Strong>ID: </Strong>
                                    {reservation.id}
                                </Item>
                            </ItemWrapper>
                        </Customer>
                    );
                });
        }
    }
    render() {
        var data = this.props.data;
        console.log("log: " + data.reservations);

        return (
            <Wrapper>
                <InnerView>
                    <Header>Find your reservation</Header>
                    <Readout>
                        Enter a customer ID below for more details.
                    </Readout>
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

const Header = styled.Text`
    font-family: "raleway-blackitalic";
    font-weight: normal;
    font-size: 40px;
    color: #fff;
`;

const Readout = styled.Text`
    color: #fff;
    padding-top: 10px;
`;

const Subhead = styled.Text`
    font-family: "raleway-bold";
    font-weight: normal;
    font-size: 15px;
    letter-spacing: 4px;
    padding-top: 30px;
`;

const Customer = styled.View`
    margin: 10px 0 40px 0;
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

export default graphql(getReservationsQuery)(FindReservation);
