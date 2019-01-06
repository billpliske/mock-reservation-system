import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import MakeReservation from "./screens/MakeReservation";
import ListReservation from "./screens/ListReservation";
import FindReservation from "./screens/FindReservation";

const Router = createMaterialTopTabNavigator(
    {
        List: {
            screen: ListReservation
        },
        Make: {
            screen: MakeReservation
        },
        Find: {
            screen: FindReservation
        }
    },
    {
        tabBarOptions: {
            labelStyle: {
                fontSize: 12
            },
            style: {
                backgroundColor: "#27363d"
            },
            indicatorStyle: {
                backgroundColor: "orange"
            }
        }
    }
);

export default Router;
