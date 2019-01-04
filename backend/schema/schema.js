const graphql = require("graphql");
const Reservation = require("../models/reservation");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const ReservationType = new GraphQLObjectType({
    name: "Reservation",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        hotelName: { type: GraphQLString },
        arrivalDate: { type: GraphQLString },
        departureDate: { type: GraphQLString }
    })
});

/* ************************** */
/* QUERIES */
/* ************************** */

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        reservation: {
            type: ReservationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Reservation.findById(args.id);
            }
        },
        reservations: {
            type: new GraphQLList(ReservationType),
            resolve(parent, args) {
                return Reservation.find({});
            }
        }
    }
});

/* ************************** */
/* MUTATIONS */
/* ************************** */

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addReservation: {
            type: ReservationType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                hotelName: { type: new GraphQLNonNull(GraphQLString) },
                arrivalDate: { type: new GraphQLNonNull(GraphQLString) },
                departureDate: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let reservation = new Reservsation({
                    name: args.name,
                    hotelName: args.hotelName,
                    arrivalDate: args.arrivalDate,
                    departureDate: args.departureDate
                });
                return reservation.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
