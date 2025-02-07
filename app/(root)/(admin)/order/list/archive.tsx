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

const orderArchive = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });

  if (isLoading) return <ActivityIndicator />;

  if (error) return Alert.alert("Failed to fetch");

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        ListEmptyComponent={
          <View style={styles.container}>
            <Text style={styles.text}>No Archieved orders found</Text>
          </View>
        }
      />
    </View>
  );
};

export default orderArchive;

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
