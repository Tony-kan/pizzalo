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
import { useInsertOrderSubscription } from "@/api/orders/subscription";

const order = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch</Text>;
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default order;

const styles = StyleSheet.create({});
