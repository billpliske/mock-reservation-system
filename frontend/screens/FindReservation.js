//import libraries
import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import { graphql } from "react-apollo";
import { getReservationsQuery, getReservationQuery } from "../queries/queries";

// create a component
class FindReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }
    showCount() {
        var data = this.props.data;

        if (data.loading) {
            return <Text>Counting reservations...</Text>;
        } else {
            return `Total reservations: ${data.reservations.length}`;
        }
    }
    displayReservations() {
        var data = this.props.data;

        if (data.loading) {
            return <Text>Loading reservations...</Text>;
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
                        <Text>
                            <Strong>Hotel: </Strong>
                            {reservation.hotelName}
                        </Text>
                        <Text>
                            <Strong>Arrival date: </Strong>
                            {reservation.arrivalDate}
                        </Text>
                        <Text>
                            <Strong>Departure date: </Strong>
                            {reservation.departureDate}
                        </Text>
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

// STYLES

const Wrapper = styled.ScrollView`
    padding: 30px;
`;

const InnerView = styled.View`
    padding-bottom: 40px;
`;

const Header = styled.Text`
    font-family: "raleway-blackitalic";
    font-weight: normal;
    font-size: 40px;
`;

const Subhead = styled.Text`
    font-family: "raleway-bold";
    font-weight: normal;
    font-size: 15px;
    letter-spacing: 4px;
    padding-top: 30px;
`;

const Customer = styled.View`
    margin: 10px 0;
`;

const Name = styled.Text`
    font-family: "raleway-blackitalic";
    font-weight: normal;
    font-size: 20px;
`;

const Strong = styled.Text`
    font-weight: bold;
`;

export default graphql(getReservationsQuery)(FindReservation);
