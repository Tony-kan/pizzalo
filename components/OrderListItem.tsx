import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, router, useSegments } from "expo-router";
import { Order } from "@/types/types";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  const onPress = () => {
    router.push(`/order/${order.id}`);
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>Order #{order.id}</Text>
        <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
      </View>

      <Text style={styles.status}>{order.status}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  time: {
    color: "gray",
  },
  status: {
    fontWeight: "500",
  },
});

export default OrderListItem;
