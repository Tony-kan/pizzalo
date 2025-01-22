import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { orders } from "@/assets/data";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscription";

const OrderDetail = () => {
  const { id } = useLocalSearchParams();

  // const order = orders.find((o) => o.id.toString() === id);
  const { data: order, isLoading, error } = useOrderDetails(id as string);
  useUpdateOrderSubscription(id as string);

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>{error.message}</Text>;

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  console.log("selected Order id: ", id);

  console.log("selected Order: ", order);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      {/* <OrderListItem order={order} /> */}

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetail;
