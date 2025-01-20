import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { profile } = useAuth();

  if (!profile || profile.group !== "ADMIN") {
    return <Redirect href="/" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "light",
        headerShown: false,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      {/* <Tabs.Screen name="order/[id]" options={{ href: null }} /> */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => "",
          // <IconSymbol size={28} name="house.fill" color={color} />
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ color }) => "",
          // <IconSymbol size={28} name="paperplane.fill" color={color} />
        }}
      />

      {/* <Tabs.Screen
        name="menu/create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => "",
          // <IconSymbol size={28} name="paperplane.fill" color={color} />
        }}
      /> */}
    </Tabs>
  );
}
