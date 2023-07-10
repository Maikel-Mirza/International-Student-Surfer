import { Tabs } from "expo-router";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#47BABC",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: " ",
          tabBarActiveTintColor: "#47BABC",
          tabBarInactiveTintColor: "#fff",
          tabBarActiveBackgroundColor: "#4E9D9E",
          tabBarIcon: () => <Ionicons name="home" size={24} color="white" />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: " ",
          tabBarActiveTintColor: "#264c59",
          tabBarInactiveTintColor: "#fff",
          tabBarActiveBackgroundColor: "#4E9D9E",
          tabBarIcon: () => (
            <MaterialIcons name="event" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="couch"
        options={{
          title: " ",
          tabBarActiveTintColor: "#264c59",
          tabBarInactiveTintColor: "#fff",
          tabBarActiveBackgroundColor: "#4E9D9E",
          tabBarIcon: () => (
            <FontAwesome5 name="couch" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: " ",
          tabBarActiveTintColor: "#264c59",
          tabBarInactiveTintColor: "#fff",
          tabBarActiveBackgroundColor: "#4E9D9E",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="oneEvent"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
