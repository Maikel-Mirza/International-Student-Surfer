import { Stack } from "expo-router";

export default function EventLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "transparent" },
        headerShadowVisible: false,
        headerTransparent: true,
        title: "",
      }}
      hideNavBar={true}
    />
  );
}
