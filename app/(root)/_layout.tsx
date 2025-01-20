import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="cart" />
    </Stack>
  );
}
