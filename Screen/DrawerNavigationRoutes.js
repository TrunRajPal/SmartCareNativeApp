import React from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import HomeScreen from "./DrawerScreens/HomeScreen";
import ProgressReport from "./DrawerScreens/ProgressReport";
import RequestService from "./DrawerScreens/RequestService";
import PaymentHistory from "./DrawerScreens/PaymentHistory";
import SessionReports from "./DrawerScreens/SessionReports";
import AddSession from "./OtherScreens/AddSession";

import CustomSidebarMenu from "./Components/CustomSidebarMenu";
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const profileScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProgressReport}
        options={{
          title: "Profile Report", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const requestServiceScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="RequestServiceScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="requestServiceScreen"
        component={RequestService}
        options={{
          title: "Request Service", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const sessionReportsScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SessionReportsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="SessionReports"
        component={SessionReports}
        options={{
          title: "Session Reports", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const paymentHistoryScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="PaymentHistory"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{
          title: "Payment History", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const requestSessionScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="RequestSession"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="RequestSession"
        component={AddSession}
        options={{
          title: "Request A Session", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#cee1f2",
          color: "#cee1f2",
          itemStyle: { marginVertical: 5, color: "white" },
          labelStyle: {
            color: "#d8d8d8",
          },
        }}
        screenOptions={{ headerShown: false }}
        drawerContent={CustomSidebarMenu}
      >
        <Drawer.Screen
          name="homeScreenStack"
          options={{
            drawerLabel: "Home Page",
            drawerIcon: () => <Entypo name="home" size={24} color="white" />,
          }}
          component={homeScreenStack}
        />
        <Drawer.Screen
          name="profileScreenStack"
          options={{
            drawerLabel: "Profile Report",
            drawerIcon: () => (
              <AntDesign name="profile" size={24} color="white" />
            ),
          }}
          component={profileScreenStack}
        />
        <Drawer.Screen
          name="addServiceScreen"
          options={{
            drawerLabel: "Request Service",
            drawerIcon: () => (
              <MaterialIcons name="room-service" size={24} color="white" />
            ),
          }}
          component={requestSessionScreenStack}
        />
        <Drawer.Screen
          name="requestServiceScreen"
          options={{
            drawerLabel: "Requested Services",
            drawerIcon: () => (
              <MaterialIcons name="view-list" size={24} color="white" />
            ),
          }}
          component={requestServiceScreenStack}
        />
        <Drawer.Screen
          name="sessionReportsScreen"
          options={{
            drawerLabel: "Session Reports",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="page-next-outline"
                size={24}
                color="white"
              />
            ),
          }}
          component={sessionReportsScreenStack}
        />
        <Drawer.Screen
          name="paymentHistory"
          options={{
            drawerLabel: "Payment History",
            drawerIcon: () => (
              <MaterialCommunityIcons name="cash" size={24} color="white" />
            ),
          }}
          component={paymentHistoryScreenStack}
        />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigatorRoutes;
