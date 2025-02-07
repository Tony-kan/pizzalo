import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

// const TopTabs = createMaterialTopTabNavigator().Navigator;
export default function OrderListTopBar() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: "Active" }} />
        {/* <TopTabs.Screen name="archive" options={{ title: "Archive" }} /> */}

        {/* <TopTabs.Screen name="archive" options={{ title: "Archieve" }} /> */}
      </TopTabs>
    </SafeAreaView>
  );
}
