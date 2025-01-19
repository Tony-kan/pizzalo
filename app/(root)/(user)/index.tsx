import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const UserLayout = () => {
  return <Redirect href={"/(root)/(user)/menu"} />;
};

export default UserLayout;
