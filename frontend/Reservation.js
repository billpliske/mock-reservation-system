//import libraries
import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import CreateReservation from "./components/CreateReservation";
import ReservationList from "./components/ReservationList";

// create a component
const Reservation = () => {
    return (
        <StyledView>
            <CreateReservation />
            <ReservationList />
        </StyledView>
    );
};

// define your styles
const StyledView = styled.View`
    flex: 1;
`;

export default Reservation;
