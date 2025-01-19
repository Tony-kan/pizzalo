import { View, Text } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Stack.Screen options={{ title: "Home" }} />
      <Link
        style={{
          marginVertical: 10,
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 10,
          color: "white",
        }}
        href="/(root)/(user)"
        asChild
      >
        <Button text="User" />
      </Link>
      <Link
        style={{
          marginVertical: 10,
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 10,
          color: "white",
        }}
        href={"/(root)/(admin)"}
        asChild
      >
        <Button text="Admin" />
      </Link>
    </View>
  );
};

export default index;
