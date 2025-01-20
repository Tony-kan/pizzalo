import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const AdminLayout = () => {
  return <Redirect href={"/(root)/(admin)/menu"} />;
};

export default AdminLayout;
