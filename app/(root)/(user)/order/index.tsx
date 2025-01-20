import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { orders } from "@/assets/data";
import OrderListItem from "@/components/OrderListItem";
import { Stack } from "expo-router";

const order = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Order" }} />

      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </>
  );
};

export default order;

const styles = StyleSheet.create({});
