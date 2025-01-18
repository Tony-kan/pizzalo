import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
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
      <Link href="/(root)/(user)" asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(root)/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  );
};

export default index;
