import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
// import { orders } from "@/assets/data";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "@/api/orders";

const orderArchive = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch</Text>;

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default orderArchive;

const styles = StyleSheet.create({});
