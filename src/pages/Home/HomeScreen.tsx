import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ContactsScreen from "./Contacts/ContactsScreen";
import GroupsScreen from "./Groups/GroupsScreen";
import ChatsScreen from "./Chats/ChatsScreen";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../@types/navigationTypes";

type HomeScreenRouteProp = RouteProp<RootStackParamList, "HomeScreen">;

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  const route = useRoute<HomeScreenRouteProp>();
  const { userId } = route.params;
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Conversas") {
            iconName = "chatbubble-ellipses-outline";
          } else if (route.name === "Contatos") {
            iconName = "people-outline";
          } else if (route.name === "Grupos") {
            iconName = "people-circle-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Conversas"
        component={ChatsScreen}
        options={{ headerShown: false }}
        initialParams={{ userId }}
      />
      <Tab.Screen
        name="Contatos"
        component={ContactsScreen}
        options={{ headerShown: false }}
        initialParams={{ userId }}
      />
      <Tab.Screen
        name="Grupos"
        component={GroupsScreen}
        options={{ headerShown: false }}
        initialParams={{ userId }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
