import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/AuthProvider";

const index = () => {
  const { isLoading, session, profile } = useAuth();

  if (isLoading) return <ActivityIndicator />;

  if (!session) return <Redirect href="/sign-in" />;

  if (profile?.group === "ADMIN") {
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
  }
  return <Redirect href="/(root)/(user)" />;
};

export default index;
