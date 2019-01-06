import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { SafeAreaView } from "react-native";
import MakeReservation from "./screens/MakeReservation";
import ListReservation from "./screens/ListReservation";
import FindReservation from "./screens/FindReservation";

class RouterWrapper extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Router />
            </SafeAreaView>
        );
    }
}

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
        initialRouteName: "Find",
        // order: ['Settings', 'Home'],
        activeColor: "gold",
        inactiveColor: "white",
        backgroundColor: "#27363d",
        tabBarOptions: {
            labelStyle: {
                fontSize: 14
            },
            style: {
                backgroundColor: "#27363d"
            },
            indicatorStyle: {
                backgroundColor: "orange"
            }
        }
    }
    // {
    //     tabBarOptions: {
    //         labelStyle: {
    //             fontSize: 14
    //         },
    //         style: {
    //             backgroundColor: "#27363d"
    //         },
    //         indicatorStyle: {
    //             backgroundColor: "orange"
    //         }
    //     }
    // }
);

export default RouterWrapper;
