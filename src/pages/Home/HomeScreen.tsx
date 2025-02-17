import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "src/styles/main";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ContactsScreen from "./Contacts/ContactsScreen";
import GroupsScreen from "./Groups/GroupsScreen";
import ChatsScreen from "./Chats/ChatsScreen";

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
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
      />
      <Tab.Screen
        name="Contatos"
        component={ContactsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Grupos"
        component={GroupsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
