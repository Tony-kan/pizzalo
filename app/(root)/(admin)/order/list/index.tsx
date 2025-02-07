import {
  ActivityIndicator,
  Alert,
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
  // console.log("Orders Index: ", JSON.stringify(orders, null, 2));

  if (isLoading) return <ActivityIndicator />;

  if (error) return Alert.alert("Failed to fetch");

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        ListEmptyComponent={
          <View style={styles.container}>
            <Text style={styles.text}>No Active orders found</Text>
          </View>
        }
      />
    </View>
  );
};

export default order;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
