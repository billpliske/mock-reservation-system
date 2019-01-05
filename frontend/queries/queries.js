import gql from "graphql-tag";

const getReservationsQuery = gql`
    {
        reservations {
            id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
`;

const addReservationMutation = gql`
    mutation AddReservation(
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

const getReservationQuery = gql`
    query GetReservation($id: ID) {
        reservation(id: $id) {
            id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
`;

export { getReservationsQuery, addReservationMutation, getReservationQuery };
