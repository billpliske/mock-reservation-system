//import libraries
import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import { graphql } from "react-apollo";
import { getReservationsQuery, getReservationQuery } from "../queries/queries";

// create a component
class ListReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }
    showCount() {
        var data = this.props.data;

        if (data.loading) {
            return <Total>Counting reservations...</Total>;
        } else {
            return (
                <Total>Total reservations: {data.reservations.length}</Total>
            );
        }
    }
    displayReservations() {
        var data = this.props.data;

        if (data.loading) {
            return <Total>Loading reservations...</Total>;
        } else {
            return data.reservations.reverse().map(reservation => {
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
        return (
            <Wrapper>
                <InnerView>
                    <Header>Reservations</Header>
                    <Text>{this.showCount()}</Text>
                    <Subhead>LISTINGS</Subhead>
                    {this.displayReservations()}
                </InnerView>
            </Wrapper>
        );
    }
}

// BEGIN STYLES

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

const Total = styled.Text`
    font-weight: normal;
    font-size: 15px;
    color: #ccc;
`;

const Subhead = styled.Text`
    font-family: "raleway-bold";
    font-weight: normal;
    font-size: 15px;
    letter-spacing: 4px;
    padding: 30px 0 10px 0;
    color: orange;
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

export default graphql(getReservationsQuery)(ListReservation);
